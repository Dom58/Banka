import joi from 'joi';

exports.validateAccount = (account) => {
  const schema = {
    accountNumber:joi.number().min(1000000000).max(9999999999),
    owner: joi.number(),
    user_id:joi.number(),
    type: joi.string().required(),
    status: joi.string(),
    balance:joi.number(),
  };
  return joi.validate(account, schema);
};

