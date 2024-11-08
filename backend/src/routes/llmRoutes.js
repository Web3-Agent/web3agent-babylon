const express = require("express");
const router = express.Router();
const llmController = require("../controllers/llmContract.controller.js");
/**
 * @description     Post a list of tables of a user
 * @access          public
 */
router.post("/submitTraining", llmController.submitTraining);
router.post("/giveReward", llmController.giveReward);

module.exports = router;