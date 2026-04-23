import { validationResult } from 'express-validator';

const validate = (req, _res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.statusCode = 400;
    next(error);
    return;
  }

  next();
};

export default validate;
