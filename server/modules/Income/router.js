const express = require('express');
const incomeRouter = express.Router();

const Authorization = requireWrapper('middleware/Authorization');

const { getIncomes, createIncomes, updateIncome, deleteIncome } = require('./incomeController');
const { getActiveAccount } = require('../Account/AccountController');
const { getIncomeCategory, createIncomeCategory, updateIncomeCategory, deleteIncomeCategory } = require('./incomeCategoryController');

incomeRouter.use(Authorization.verifyToken);
incomeRouter.use(getActiveAccount);
incomeRouter.get('/', getIncomes);

incomeRouter.post('/', createIncomes);

incomeRouter.put('/:id', updateIncome);

incomeRouter.delete('/:id', deleteIncome);

incomeRouter.get('/category', getIncomeCategory);

incomeRouter.post('/category', createIncomeCategory);

incomeRouter.put('/category/:id', updateIncomeCategory);

incomeRouter.delete('/category/:id', deleteIncomeCategory);

module.exports = incomeRouter;
