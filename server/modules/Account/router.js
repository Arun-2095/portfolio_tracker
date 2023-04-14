const express = require('express');
const accountRouter = express.Router();

const Authorization = requireWrapper('middleware/Authorization');

const { GetAccountDetails, createAccount, getActiveAccount } = require('./accountController');

accountRouter.use(Authorization.verifyToken);

accountRouter.post('/', createAccount);

accountRouter.use(getActiveAccount);

accountRouter.get('/', GetAccountDetails);

module.exports = accountRouter;
