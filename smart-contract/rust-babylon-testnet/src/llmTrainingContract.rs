use cosmwasm_std::{
    entry_point, 
    to_binary, 
    Binary, 
    Deps, 
    DepsMut, 
    Env, 
    MessageInfo, 
    Response, 
    StdResult, 
    Coin, 
    Addr, 
    StdError, 
    Timestamp
};
use cw_storage_plus::{Map, Item};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct LlmRequest {
    pub user: Addr,
    pub llm_model_id: String,
    pub requirement: String,
    pub deadline: u64,
    pub reward: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct TrainingUserRequest {
    pub user: Addr,
    pub user_accept_time: u64,
}

// Store the current index ID
const LLM_INDEX_ID: Item<u64> = Item::new("llm_index_id");

// Store LLM requests, indexed by ID
const LLM_REQUESTS: Map<u64, LlmRequest> = Map::new("llm_requests");

// Store the user training requests for each LLM request, indexed by LLM ID
const USER_TRAINING_ADDRESSES: Map<u64, Vec<TrainingUserRequest>> = Map::new("user_training_addresses");

// Event to emit when an LLM training request is made
const LLM_REQUEST_EVENT: &str = "llm_request";

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct InstantiateMsg;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct ExecuteMsg {
    pub request_training: Option<RequestTrainingMsg>,
    pub accept_training: Option<u64>,
    pub submit_training: Option<SubmitTrainingMsg>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct RequestTrainingMsg {
    pub llm_model_id: String,
    pub requirement: String,
    pub deadline: u64,
    pub reward: u64,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct SubmitTrainingMsg {
    pub fine_tuned_model_id: String,
    pub dataset_id: String,
    pub fine_tune_hosted_script: String,
}

#[entry_point]
pub fn instantiate(
    _deps: DepsMut,
    _env: Env,
    _info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {
    // Initialize the index for the LLM requests
    LLM_INDEX_ID.save(_deps.storage, &0)?;

    Ok(Response::default())
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> StdResult<Response> {
    if let Some(request_training_msg) = msg.request_training {
        return handle_request_training(deps, env, info, request_training_msg);
    }

    if let Some(index_id) = msg.accept_training {
        return handle_accept_training(deps, env, info, index_id);
    }

    if let Some(submit_training_msg) = msg.submit_training {
        return handle_submit_training(deps, env, info, submit_training_msg);
    }

    Err(StdError::generic_err("Invalid message"))
}

fn handle_request_training(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: RequestTrainingMsg,
) -> StdResult<Response> {
    // Ensure deadline is in the future
    if msg.deadline < env.block.time.seconds() {
        return Err(StdError::generic_err("INVALID_TIMESTAMP"));
    }

    // Ensure the sent amount matches the reward
    if info.funds.iter().any(|coin| coin.amount.u128() != msg.reward as u128) {
        return Err(StdError::generic_err("INVALID_AMOUNT"));
    }

    // Get the current LLM index ID and increment it
    let mut llm_index_id = LLM_INDEX_ID.load(deps.storage)?;
    
    // Clone the `llm_model_id` and `requirement` to avoid moving them
    let request = LlmRequest {
        user: info.sender.clone(),
        llm_model_id: msg.llm_model_id.clone(),  // Clone here
        requirement: msg.requirement.clone(),    // Clone here
        deadline: msg.deadline,
        reward: msg.reward,
    };

    // Save the LLM request in the map
    LLM_REQUESTS.save(deps.storage, llm_index_id, &request)?;

    // Increment the index ID for the next request
    LLM_INDEX_ID.save(deps.storage, &(llm_index_id + 1))?;

    // Emit event
    let event = cosmwasm_std::Event::new(LLM_REQUEST_EVENT)
        .add_attribute("user", info.sender.to_string())
        .add_attribute("llm_index", llm_index_id.to_string())
        .add_attribute("llm_model_id", &msg.llm_model_id)
        .add_attribute("requirement", &msg.requirement)
        .add_attribute("deadline", msg.deadline.to_string())
        .add_attribute("reward", msg.reward.to_string());

    Ok(Response::new().add_event(event))
}



fn handle_accept_training(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    index_id: u64,
) -> StdResult<Response> {
    // Check if index_id is valid
    let llm_request = LLM_REQUESTS.may_load(deps.storage, index_id)?;
    match llm_request {
        Some(_) => {}
        None => return Err(StdError::generic_err("INVALID_INDEX_ID")),
    }

    // Add the user to the list of users for this training request
    let mut users = USER_TRAINING_ADDRESSES.may_load(deps.storage, index_id)?.unwrap_or_default();
    let training_user = TrainingUserRequest {
        user: info.sender.clone(),
        user_accept_time: _env.block.time.seconds(),
    };
    users.push(training_user);

    // Save the updated list of users
    USER_TRAINING_ADDRESSES.save(deps.storage, index_id, &users)?;

    Ok(Response::default())
}

fn handle_submit_training(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    index_id: u64,
    fine_tuned_model_id: String,
    dataset_id: String,
    fine_tune_hosted_script: String,
) -> StdResult<Response> {
    // Load the current LLM index ID
    let llm_index_id = LLM_INDEX_ID.load(deps.storage)?;

    // Ensure the index_id is valid (i.e., less than or equal to the current LLM index ID)
    if index_id > llm_index_id {
        return Err(StdError::generic_err("INVALID_INDEX_ID"));
    }

    // Emit the llmSubmitted event with the necessary attributes
    let event = cosmwasm_std::Event::new("llmSubmitted")
        .add_attribute("user", info.sender.to_string())
        .add_attribute("index_id", index_id.to_string())
        .add_attribute("fine_tuned_model_id", fine_tuned_model_id)
        .add_attribute("dataset_id", dataset_id)
        .add_attribute("fine_tune_hosted_script", fine_tune_hosted_script);

    Ok(Response::new().add_event(event))
}

