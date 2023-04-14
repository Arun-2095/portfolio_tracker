
const { incomeCategory: incomeCategoryModel, sequelize } = requireWrapper('models');

async function getIncomeCategory (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const AccountId = Accounts[0]?.id || null;
  // console.log(JSON.stringify(Accounts), 'USERDATA');
  try {
    const incomeCategory = await incomeCategoryModel.findAll({
      attributes: {

        exclude: ['AccountId']
      },
      where: { AccountId }

    });
    if (incomeCategory === null) {
      response.send(new ErrorBuilder(400, 'There is No income Exist', 'something went wrong'));
    } else {
      response.send({ message: 'income details', incomeCategory });
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, 'There is No income Exist', err));
  }
}

async function createIncomeCategory (request, response, next) {
  const { user: { Accounts = [] } } = request.userData;
  const { category } = request.body;

  const AccountId = Accounts[0]?.id;

  try {
    const result = await sequelize.transaction(async (t) => {
      let isCategoryExists = await incomeCategoryModel.findOne({ where: { AccountId, name: category } }, { transaction: t });

      if (isCategoryExists == null) {
        isCategoryExists = await incomeCategoryModel.create({ AccountId, name: category }, { transaction: t });
      } else {
        throw new Error('categroy already exists');
      }

      return isCategoryExists;
    });
    response.send({ message: 'income category details added', result });
  } catch (err) {
    // console.log(err, err.message, 'ERROR');
    response.send(new ErrorBuilder(400, err?.message, err));
  }
}

async function updateIncomeCategory (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const AccountId = Accounts[0]?.id || null;

  const { category } = request.body;

  const { id } = request.params;

  try {
    const isIncomeCategoryExists = await incomeCategoryModel.findOne({
      attributes: {
        exclude: ['AccountId']
      },
      where: { AccountId, id }
    });

    if (isIncomeCategoryExists != null) {
      isIncomeCategoryExists.name = category;

      isIncomeCategoryExists.save();

      response.status(204).send({ message: 'income Category details are updated', income: isIncomeCategoryExists });
    } else {
      throw Error('Income Category doesn\'t exist');
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, err?.message, err));
  }
}

async function deleteIncomeCategory (request, response) {
  const { user: { Accounts = [] } } = request.userData;

  const { id } = request.params;

  const AccountId = Accounts[0]?.id || null;

  try {
    const isIncomeDeleted = await incomeCategoryModel.destroy({ where: { AccountId, id } });

    if (isIncomeDeleted !== 0) {
      response.send({ message: 'income Category details are deleted' });
    } else {
      throw new Error('income Category doesn\'t exists');
    }
  } catch (err) {
    response.send(new ErrorBuilder(400, err?.message, err));
  }
}

module.exports = { getIncomeCategory, createIncomeCategory, updateIncomeCategory, deleteIncomeCategory };
