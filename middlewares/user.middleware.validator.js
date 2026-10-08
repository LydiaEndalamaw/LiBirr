const {body, validationResult} =require('express-validator');
const registerValidation = [
body('name')
.notEmpty().withMessage('name is required')
.isLength({min: 2}).withMessage('Name must be at least 2 characters'),

// body('age')
// .notEmpty().withMessage('Age is required')
// .isNumeric().withMessage('Age must be number')
// .custom((value)=> value> 0).withMessage('Age must be greater than 0'),

body('email')
.notEmpty().withMessage('Email is required')
.isEmail().withMessage('Email is invalid'),

body('password')
.notEmpty().withMessage('password is requred')
.isLength({ min: 6 }).withMessage('Password must be at least 6 characters')


];
const loginValidation = [

body('email')
.notEmpty().withMessage('Email is required')
.isEmail().withMessage('Email is invalid'),

body('password')
.notEmpty().withMessage('password is requred')
.isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // 1. Grab just the very first error message text
    const firstErrorMessage = errors.array()[0].msg;
    
    // 2. Send it back as a simple "message" string!
    return res.status(400).json({
      message: firstErrorMessage
    });
  }
  next();

};
module.exports={registerValidation,loginValidation,validate}