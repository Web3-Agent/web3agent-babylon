pragma solidity ^0.8.20;

contract LLMTrainingRequest{

    uint llmIndexId;

    struct LlmRequest{
        address user;
        string llmModelId;
        string requirement;
        uint deadline ;
        uint reward;
    }

    struct TrainingUserRequest{
        address user;
        uint userAcceptTime;
    }

    event llmRequest(address user,uint llmIndex,string llmModelLink, string requirement,uint deadline ,uint reward);
    event llmSubmitted(address user, uint _indexId, string fineTunedModelId, string datasetId, string fineTuneHostedScript );

    mapping(uint => LlmRequest) public LlmIndex;
    mapping(uint => TrainingUserRequest[]) public userTrainingAddresses;

    constructor(){
        llmIndexId = 0;
    }

    function requestTraining(string memory llmModelId, string memory requirement,uint deadline ,uint reward) public payable {
        require(deadline < block.timestamp, "INVALID_TIMESTAMP");
        require(msg.value == reward, "INVALID_AMOUNT");

        LlmIndex[llmIndexId].user = msg.sender;
        LlmIndex[llmIndexId].llmModelId = llmModelId;
        LlmIndex[llmIndexId].requirement = requirement;
        LlmIndex[llmIndexId].deadline = deadline;
        LlmIndex[llmIndexId].reward = reward;

        emit llmRequest(msg.sender,llmIndexId,llmModelId,requirement,deadline,reward);
        llmIndexId ++;
    }

    function acceptTraining(uint _indexId) external {
        require(_indexId<= llmIndexId, "INVALID_INDEX_ID");

        userTrainingAddresses[_indexId].push(TrainingUserRequest(msg.sender,block.timestamp));
    }

    function retrieveTrainingUser(uint _indexId,uint index) public view returns(TrainingUserRequest memory){
        return userTrainingAddresses[_indexId][index];
    }

    function submitTraining(uint _indexId, string memory fineTunedModelId, string memory datasetId, string memory fineTuneHostedScript) external {
        require(_indexId<= llmIndexId, "INVALID_INDEX_ID");

        emit llmSubmitted(msg.sender, _indexId,fineTunedModelId,datasetId,fineTuneHostedScript);
    }

    //need to add access management
    function giveReward(uint _indexId,address user) external {
        uint reward = LlmIndex[_indexId].reward;

        (bool success, ) = user.call{value: reward}("");
        require(success, "Transfer failed");
    }

    receive() payable external {}
    fallback() payable external {}
}



