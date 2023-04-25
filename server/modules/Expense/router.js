
const express = require('express');
const expenseRouter = express.Router();

const Authorization = requireWrapper('middleware/Authorization');

const { getExpense, createExpense, updateExpense, deleteExpense } = require('./expenseController');
const { getActiveAccount } = require('../Account/AccountController');
const { getExpenseCategory, createExpenseCategory, updateExpenseCategory, deleteExpenseCategory } = require('./expenseCategoryController');

expenseRouter.use(Authorization.verifyToken);
expenseRouter.use(getActiveAccount);
expenseRouter.get('/', getExpense);

expenseRouter.post('/', createExpense);

expenseRouter.put('/:id', updateExpense);

expenseRouter.delete('/:id', deleteExpense);

expenseRouter.get('/category', getExpenseCategory);

expenseRouter.post('/category', createExpenseCategory);

expenseRouter.put('/category/:id', updateExpenseCategory);

expenseRouter.delete('/category/:id', deleteExpenseCategory);

module.exports = expenseRouter;
