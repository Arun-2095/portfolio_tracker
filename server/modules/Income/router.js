const express = require('express');
const incomeRouter = express.Router();

const Authorization = requireWrapper('middleware/Authorization');

const { getIncomes, createIncomes } = require('./incomeController');

incomeRouter.use(Authorization.verifyToken);

incomeRouter.get('/', getIncomes);

incomeRouter.post('/', createIncomes);

incomeRouter.post('/:id', createIncomes);

module.exports = incomeRouter;
