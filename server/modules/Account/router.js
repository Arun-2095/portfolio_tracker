const express = require("express");
const accountRouter = express.Router();

const Authorization = requireWrapper("middleware/Authorization");

const {GetAccountDetails} = require("./accountController")

accountRouter.get("/", Authorization.verifyToken, GetAccountDetails);


module.exports = accountRouter;