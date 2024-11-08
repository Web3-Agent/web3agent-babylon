const { web3AgentChainInstance } = require("./web3.js")

const LlmContractAbi = require("../constants/abi/LlmContract.json")

const ADDRESS = '0x0c26bFB952af70829C91ada9f2e860e70225C810'

const Web3AgentContractInstance = async () => {
	var web3 = null
	try {
		web3 = await web3AgentChainInstance;
	} catch (error) {
		console.log('👉🏻 Line 496 : ', 'INIT', error);
	}

	let llmContract
	try {
    var currentBlockNumber = await web3.eth.getBlockNumber();
		llmContract = await new web3.eth.Contract(LlmContractAbi, ADDRESS)
    llmContract.currentBlockNumber = Number(currentBlockNumber);
	} catch (error) {
		console.log('👉🏻 Line 499 : ', error);
	}


	return llmContract
}

module.exports = { Web3AgentContractInstance }
