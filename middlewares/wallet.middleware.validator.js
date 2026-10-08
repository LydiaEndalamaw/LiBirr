const { body, validationResult } = require('express-validator');

const isUuidOrNumeric = (value) => {
  if (typeof value === 'number') return true;
  if (typeof value !== 'string') return false;

  const numericRegex = /^\d+$/;
  const uuidV4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return numericRegex.test(value) || uuidV4Regex.test(value);
};

const userIdValidation = body('user_id')
  .notEmpty().withMessage('user_id is required')
  .bail()
  .custom((value) => {
    if (!isUuidOrNumeric(value)) {
      throw new Error('user_id must be a number or UUID');
    }
    return true;
  });

const senderIdValidation = body('sender_id')
  .notEmpty().withMessage('sender_id is required')
  .bail()
  .custom((value) => {
    if (!isUuidOrNumeric(value)) {
      throw new Error('sender_id must be a number or UUID');
    }
    return true;
  });

const createWalletValidation = [
  userIdValidation,
];

const checkBalanceValidation = [
  userIdValidation,
];

const topupWalletValidation = [
  userIdValidation,
  body('amount')
    .notEmpty().withMessage('amount is required')
    .isNumeric().withMessage('amount must be number'),
];

const topupAirTimeValidation = [
  userIdValidation,
  body('amount')
    .notEmpty().withMessage('amount is required')
    .isNumeric().withMessage('amount must be number'),
  body('phone_number')
    .notEmpty().withMessage('phone_number is required')
    .isNumeric().withMessage('phone_number must be number')
    .isLength({ min: 10 }).withMessage('phone_number must be 10 characters'),
];

const transferValidation = [
  body('reciver_email')
    .notEmpty().withMessage('reciver_email is required'),
  senderIdValidation,
  body('amount')
    .notEmpty().withMessage('amount is required')
    .isNumeric().withMessage('amount must be number'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  createWalletValidation,
  topupWalletValidation,
  checkBalanceValidation,
  topupAirTimeValidation,
  transferValidation,
  validate
};