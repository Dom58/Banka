import joi from 'joi';

exports.validateUser = (user) => {
  const schema = {
    firstName: joi.string().min(2).max(40).required(),
    lastName: joi.string().min(2).max(40).required(),
    email: joi.string().email({ minDomainAtoms: 2 }).required(),
    // status: joi.string(),
    type: joi.string(),
    isAdmin: joi.boolean(),
    password: joi.string().min(6).required(),
  };
  return joi.validate(user, schema);
};

exports.validateLogin = (user) => {
  const login = {
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  };
  return joi.validate(user, login);
};
