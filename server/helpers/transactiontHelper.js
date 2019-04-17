import joi from 'joi';

exports.validatetransaction = (transaction) => {
  const schema = {
    acccountNumber:joi.string(),
    cashier:joi.number(),
    amount:joi.number().required(),
  };
  return joi.validate(transaction, schema);
};

