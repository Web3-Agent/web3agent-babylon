import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv"

dotenv.config({ path: ".env" })

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
      hardhat: {
        forking: {
          url: process.env.MAINNET_RPC_URL || "",
          // blockNumber: 8392800, // Mode block
          // blockNumber: 21459991, // Base Block
          // blockNumber: 126301398, // OP Block
          enabled: true,
        },
      },
      web3Agent: {
        chainId: 11001,
        url: "https://web3agent.alt.technology",
        accounts: [process.env.PRIVATE_KEY],
      },
}};

export default config;
