const express = require('express');
const accountRouter = express.Router();

const Authorization = requireWrapper('middleware/Authorization');

const { GetAccountDetails, createAccount } = require('./accountController');

accountRouter.use(Authorization.verifyToken);

accountRouter.get('/', GetAccountDetails);

accountRouter.post('/', createAccount);

module.exports = accountRouter;
