import Joi from "joi";

const userValidator = (req, res, next) => {
  let { firstname, lastname, email, password } = req.body;

  const schema = Joi.object().keys({
    firstname: Joi.string().required().alphanum(),
    lastname: Joi.string().required().alphanum(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().required(),
  });

  const inputValue = {
    firstname,
    lastname,
    email,
    password,
  };

  const validateInput = schema.validate(inputValue);

  if (validateInput.error) {
    return res.status(401).json({
      message: "Please supply the correct input value",
      error: validateInput.error.details[0].message,
    });
  }
  return next();
};

export default userValidator;
