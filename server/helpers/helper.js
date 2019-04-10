import joi from 'joi';

exports.validateUser = (user) => {
  const schema = {
    firstName: joi.string().min(2).max(40).required(),
    lastName: joi.string().min(2).max(40).required(),
    email: joi.string().email().required(),
    phoneNumber: joi.string().required(),
    status: joi.string().required(),
    isAdmin: joi.boolean().required(),
    password: joi.string().min(6).required(),
  };
  return joi.validate(user, schema);
};

