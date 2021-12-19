import { body, param, ValidationChain } from "express-validator";

const taskValidationChain = <ValidationChain[]>[
  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("not allow to Empty!")
    .isAlphanumeric()
    .withMessage("should contain some char!"),
  body("desc").trim().escape(),
];

const updateTaskValidationChain = <ValidationChain[]>[
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("not allow to Empty!")
    .isAlphanumeric()
    .withMessage("should contain some char!"),
];

export default {
  taskValidation: taskValidationChain,
  updateTaskValidation: updateTaskValidationChain,
};
