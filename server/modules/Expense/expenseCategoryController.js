
const { ExpenseCategory: ExpenseCategoryModel, sequelize } = requireWrapper('models');

async function getExpenseCategory (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const AccountId = Accounts[0]?.id || null;
  // console.log(JSON.stringify(Accounts), 'USERDATA');
  try {
    const expenseCategory = await ExpenseCategoryModel.findAll({
      attributes: {

        exclude: ['AccountId']
      },
      where: { AccountId }

    });
    if (expenseCategory === null) {
      response.send(new ErrorBuilder(400, 'There is No expense Exist', 'something went wrong'));
    } else {
      response.send({ message: 'expense details', expenseCategory });
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, 'There is No expense Exist', err));
  }
}

async function createExpenseCategory (request, response, next) {
  const { user: { Accounts = [] } } = request.userData;
  const { category } = request.body;

  const AccountId = Accounts[0]?.id;

  try {
    const result = await sequelize.transaction(async (t) => {
      let isCategoryExists = await ExpenseCategoryModel.findOne({ where: { AccountId, category } }, { transaction: t });

      if (isCategoryExists == null) {
        isCategoryExists = await ExpenseCategoryModel.create({ AccountId, category }, { transaction: t });
      } else {
        throw new Error('categroy already exists');
      }

      return isCategoryExists;
    });
    response.send({ message: 'expense category details added', result });
  } catch (err) {
    // console.log(err, err.message, 'ERROR');
    response.send(new ErrorBuilder(400, err?.message, err));
  }
}

async function updateExpenseCategory (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const AccountId = Accounts[0]?.id || null;

  const { category } = request.body;

  const { id } = request.params;

  try {
    const isExpenseCategoryExists = await ExpenseCategoryModel.findOne({
      attributes: {
        exclude: ['AccountId']
      },
      where: { AccountId, id }
    });

    if (isExpenseCategoryExists != null) {
      isExpenseCategoryExists.category = category;

      isExpenseCategoryExists.save();

      response.status(204).send({ message: 'expense Category details are updated', expense: isExpenseCategoryExists });
    } else {
      throw Error('expense Category doesn\'t exist');
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, err?.message, err));
  }
}

async function deleteExpenseCategory (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const { id } = request.params;

  const AccountId = Accounts[0]?.id || null;

  try {
    const isExpenseDeleted = await ExpenseCategoryModel.destroy({ where: { AccountId, id } });

    if (isExpenseDeleted !== 0) {
      response.send({ message: 'expense Category details are deleted' });
    } else {
      throw new Error('expense Category doesn\'t exists');
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, err?.message, err));
  }
}

module.exports = { getExpenseCategory, createExpenseCategory, updateExpenseCategory, deleteExpenseCategory };
