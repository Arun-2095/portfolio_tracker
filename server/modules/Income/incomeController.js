
const { Income, incomeCategory: incomeCategoryModel, sequelize } = requireWrapper('models');

async function getIncomes (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const AccountId = Accounts[0]?.id || null;
  // console.log(JSON.stringify(Accounts), 'USERDATA');
  try {
    const income = await Income.findAll({
      attributes: {

        exclude: ['AccountId']
      },
      where: { AccountId }

    });
    if (income === null) {
      response.send(new ErrorBuilder(400, 'There is No income Exist', 'something went wrong'));
    } else {
      response.send({ message: 'income details', income });
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, 'There is No income Exist', err));
  }
}

async function createIncomes (request, response) {
  const { user: { Accounts = [] } } = request.userData;
  const { amount, categoryId } = request.body;

  const AccountId = Accounts[0]?.id;

  try {
    const result = await sequelize.transaction(async (t) => {
      const isIncomeCategoryExists = await incomeCategoryModel.findOne({ where: { AccountId, id: categoryId } }, { transaction: t });

      console.log(isIncomeCategoryExists, 'isIncomeExists');
      if (isIncomeCategoryExists != null) {
        const incomes = await Income.create({ AccountId, amount, incomeCategoryId: categoryId }, { transaction: t });
        return incomes;
      } else {
        throw new Error('there is no such category exists');
      }

      // return isIncomeExists;
    });
    response.send({ message: 'income details added', result });
  } catch (err) {
    response.send(new ErrorBuilder(400, err?.message, err));
  }
}

async function updateIncome (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const AccountId = Accounts[0]?.id || null;

  const { amount } = request.body;

  const { id } = request.params;

  try {
    const isIncomeExists = await Income.findOne({
      attributes: {
        exclude: ['AccountId', 'incomeCategoryId']
      },
      where: { AccountId, id }
    });

    if (isIncomeExists != null) {
      isIncomeExists.amount = amount;

      isIncomeExists.save();

      response.status(204).send({ message: 'income details are updated', income: isIncomeExists });
    } else {
      response.send(new ErrorBuilder(400, 'something went wrong', 'income doesn\'t exists'));
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, 'There is issues Exist', err || err?.message));
  }
}

async function deleteIncome (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const { id } = request.params;

  const AccountId = Accounts[0]?.id || null;

  try {
    const isIncomeDeleted = await Income.destroy({ where: { AccountId, id } });

    if (isIncomeDeleted !== 0) {
      response.send({ message: 'income details are deleted' });
    } else {
      response.send(new ErrorBuilder(400, 'something went wrong', 'income doesn\'t exists'));
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, 'There is issues Exist', err || err?.message));
  }
}

module.exports = { getIncomes, createIncomes, updateIncome, deleteIncome };
