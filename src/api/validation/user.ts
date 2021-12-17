import { body, param, ValidationChain } from "express-validator";

const rigesterValidationChain = <ValidationChain[]>[
  body("firstname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage('not allow to Empty!')
    .isAlpha()
    .withMessage("should contain some char!"),
  body("lastname")
    .trim()
    .escape()
    .notEmpty()
    .withMessage('not allow to Empty!')
    .isAlpha()
    .withMessage("should contain some char!"),
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage('not allow to Empty!')
    .isAlphanumeric()
    .withMessage("should contain some number and char!"),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .withMessage('not allow to Empty!')
    .isLength({ min: 8 })
    .withMessage('min length is 8 char!')
    .isAlphanumeric()
    .withMessage("should contain some number and char!")
];



export default {
    rigesterValidation: rigesterValidationChain
}