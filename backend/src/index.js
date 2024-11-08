/**
 * ----------- MEMEFY ----------
 */

const dotenv = require("dotenv");

dotenv.config();

const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 4040;
const fileUpload = require("express-fileupload");
const { submitTraining } = require("./controllers/llmContract.controller");
const { LlmRequest } = require("./events/events");

// create app
const app = express();

// initialize middlewares
app.use(express.json());
app.use(cors());
app.use(fileUpload());

// initialize routes
app.use("/llm", require("./routes/llmRoutes"));

app.get('/', async (request, response) => {
    try {
        response.status(200).json("OK")
    } catch (error) {
        console.log('ERROR_IN_ROUTE', error);
    }
})
// Event listener 
LlmRequest()
// submitTraining();

app.listen(port, () => console.log(`[API] Server started on port - ${port}`));

