const { Web3AgentContractInstance } = require('../utils/contractInstance.js');
const mapTokenData = (event) => {
    try {
        const result = {};
        const { returnValues } = event
        result['user'] = returnValues.user;
        result['llmIndex'] = returnValues.llmIndex;
        result['llmModelLink'] = returnValues.llmModelLink;
        result['requirement'] = returnValues.requirement;
        result['deadline'] = returnValues.deadline;
        result['reward'] = returnValues.reward;
        return result;
    } catch (error) {
        console.log("ERROR_WHILE_LISTENING ", error)
    }
}
const LlmRequest = async () => {
    try {
        let contract = await Web3AgentContractInstance();
        console.log(contract.currentBlockNumber)
        const fromBlock = (contract.currentBlockNumber - 20).toString();
        await contract.events.llmRequest({fromBlock, }, async function (error, event) {
            if (error) {
                throw error;
            }
            console.log(event)
            const mappedData = mapTokenData(event)
            console.log(mappedData);
            console.log("llmRequest DATA: ",mappedData);

            return mappedData
        })
    } catch (error) {
        console.log('ERROR_WHILE_GETTING_TOKEN_DATA : ', error);
    }
}

module.exports = {
    LlmRequest,
};