
const { Expense, ExpenseCategory, sequelize } = requireWrapper('models');

async function getExpense (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const AccountId = Accounts[0]?.id || null;
  // console.log(JSON.stringify(Accounts), 'USERDATA');
  try {
    const expense = await Expense.findAll({
      attributes: {
        exclude: ['AccountId']
      },
      where: { AccountId },
      include: [ExpenseCategory]
      // plain: true

    });
    if (expense === null) {
      response.send(new ErrorBuilder(400, 'There is No income Exist', 'something went wrong'));
    } else {
      response.send({ message: 'expense details', expense });
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, 'There is No income Exist', err));
  }
}

async function createExpense (request, response) {
  const { user: { Accounts = [] } } = request.userData;
  const { amount, categoryId, description } = request.body;

  const AccountId = Accounts[0]?.id;

  try {
    const result = await sequelize.transaction(async (t) => {
      const isExpenseCategory = await ExpenseCategory.findOne({ where: { AccountId, id: categoryId } }, { transaction: t });

      console.log(isExpenseCategory, 'isExpenseExist');
      if (isExpenseCategory != null) {
        const expense = await Expense.create({ AccountId, amount, ExpenseCategoryId: categoryId, description }, { transaction: t });
        return expense;
      } else {
        throw new Error('there is no such category exists');
      }

      // return isExpenseExist;
    });
    response.send({ message: 'expense details added', result });
  } catch (err) {
    response.send(new ErrorBuilder(400, err?.message, err));
  }
}

async function updateExpense (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const AccountId = Accounts[0]?.id || null;

  const { amount, description } = request.body;

  const { id } = request.params;

  try {
    const isExpenseExist = await Expense.findOne({
      attributes: {
        exclude: ['AccountId', 'ExpenseCategoryId']
      },
      where: { AccountId, id }
    });

    if (isExpenseExist != null) {
      if (amount) {
        isExpenseExist.amount = amount;
      }
      if (description) {
        isExpenseExist.description = description;
      }
      isExpenseExist.save();

      response.status(204).send({ message: 'expense details are updated', expense: isExpenseExist });
    } else {
      response.send(new ErrorBuilder(400, 'something went wrong', 'expense doesn\'t exists'));
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, 'There is issues Exist', err || err?.message));
  }
}

async function deleteExpense (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const { id } = request.params;

  const AccountId = Accounts[0]?.id || null;

  try {
    const isExpenseDeleted = await Expense.destroy({ where: { AccountId, id } });

    if (isExpenseDeleted !== 0) {
      response.send({ message: 'expense details are deleted' });
    } else {
      response.send(new ErrorBuilder(400, 'something went wrong', 'expense doesn\'t exists'));
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, 'There is issues Exist', err || err?.message));
  }
}

module.exports = { getExpense, createExpense, updateExpense, deleteExpense };
