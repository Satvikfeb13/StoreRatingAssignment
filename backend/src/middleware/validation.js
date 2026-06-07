const {
  body,
  validationResult
} = require("express-validator");

const validateUser = [

  body("name")
    .isLength({
      min: 20,
      max: 60
    })
    .withMessage(
      "Name must be between 20 and 60 characters"
    ),

  body("email")
    .isEmail()
    .withMessage(
      "Invalid email"
    ),

  body("address")
    .isLength({
      max: 400
    })
    .withMessage(
      "Address max length is 400"
    ),

  body("password")
    .matches(
      /^(?=.*[A-Z])(?=.*[\W_]).{8,16}$/
    )
    .withMessage(
      "Password must contain uppercase letter and special character"
    ),

  (req, res, next) => {

    const errors =
      validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    next();
  }
];

module.exports = {
  validateUser
};