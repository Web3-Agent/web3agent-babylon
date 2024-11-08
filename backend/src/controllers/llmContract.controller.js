// Meme controllers
const axios = require("axios");
const path = require('path');
const fs = require('fs');
const ethers = require('ethers');

const dotenv = require("dotenv");

const LlmContractAbi = require("../constants/abi/LlmContract.json")

const ADDRESS = '0x0c26bFB952af70829C91ada9f2e860e70225C810'

dotenv.config(".env");

const PrivateKey = process.env.privateKey;

const FormData = require('form-data'); 

const requestTraining = async (req, res) => {
    const { llmModelId,requirement,deadline ,reward } = req.query;

    res.send(submissions);
};

const submitTraining = async (req,res) => {
    try {
    const {indexId,user,fineTunedModel_Id, dataset_Id} = req.body;
    const {llmScript} = req.files;

    const uploadPath = path.join(__dirname, llmScript.name);

    if (!fs.existsSync(path.join(__dirname ))) {
        fs.mkdirSync(path.join(__dirname ));
      }
        // Move the file to the "uploads" directory
        await llmScript.mv(uploadPath);

        // Now, forward the uploaded file to another server
        const formData = new FormData();
        
        formData.append('finetuning_script_file', fs.createReadStream(uploadPath));
        formData.append('dataset_id', dataset_Id);
        formData.append('finetuned_model_id', fineTunedModel_Id);

        const response = await axios.post('https://4a5e-34-173-170-191.ngrok-free.app/check_contribution', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
    
        // Delete the temporary file after forwarding
        fs.unlinkSync(uploadPath);

        if(response.data.contribution_score>20){
            const r = giveReward({indexId:indexId,user:user})
            console.log(r);
        }
    
        return res.json({
          message: 'File uploaded and forwarded successfully!',
          response: response.data,
        });
    
      } catch (error) {
        // Handle any errors
        console.error('Error during file upload/forwarding:', error);
        return res.status(500).send('An error occurred while uploading the file.');
      }
    }

    const giveReward = async (req) => {
        try{
        const {indexId,user} = req;
        const provider = new ethers.JsonRpcProvider("https://web3agent.alt.technology");
        const wallet = new ethers.Wallet(process.env.privateKey,provider)

        const contract = new ethers.Contract(ADDRESS, LlmContractAbi, wallet);

        await contract.giveReward(indexId,user);
            return ("Reward sent");
        }catch(error){
            console.log(error);
        }
    }

module.exports = {
    submitTraining,
    requestTraining,
    giveReward
}