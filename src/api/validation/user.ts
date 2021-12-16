import { body, param, ValidationChain } from "express-validator";

const rigesterValidationChain = <ValidationChain[]>[
  body("username")
    .trim()
    .escape()
    .notEmpty()
    .withMessage('not allow to Empty!')
    .isAlphanumeric()
    .withMessage("should contain some number and char!"),

];



export default {
    rigesterValidation: rigesterValidationChain
}