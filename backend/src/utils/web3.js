const {Web3} = require("web3");

const web3AgentNetwork = `wss://web3agent.alt.technology/ws`
const web3AgentChainInstance = new Promise(resolve => {
    resolve(
        new Web3(
            new Web3.providers.WebsocketProvider(web3AgentNetwork, {
                reconnect: {
                    auto: true,
                    delay: 5000, // ms
                    maxAttempts: 10,
                    onTimeout: false,
                },
            })
        )
    )
});

module.exports = {
    web3AgentChainInstance
}