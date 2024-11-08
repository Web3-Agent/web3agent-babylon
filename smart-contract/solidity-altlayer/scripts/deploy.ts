import { ethers } from "hardhat"

async function main(){
    const Contract = await ethers.getContractFactory("LLMTrainingRequest");
    const contract = await Contract.deploy();
    console.log(await contract.getAddress());
}

main();