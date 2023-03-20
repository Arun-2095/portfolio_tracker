const express = require('express');
const incomeRouter = express.Router();

const Authorization = requireWrapper('middleware/Authorization');

const { getIncomes } = require('./incomeController');

incomeRouter.use(Authorization.verifyToken);

incomeRouter.get('/', getIncomes);

module.exports = incomeRouter;
