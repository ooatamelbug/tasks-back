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

const updateTaskIdValidationChain = <ValidationChain[]>[
  param("id")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("not allow to Empty!")
    .isAlphanumeric()
    .withMessage("should contain some char!"),
];

const updateTaskValidationChain = <ValidationChain[]>[
  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("not allow to Empty!")
    .isAlphanumeric()
    .withMessage("should contain some char!"),
  body("desc").trim().escape(),
  body("status").trim().escape(),
];

const deleteTaskValidationChain = <ValidationChain[]>[
  body("tasksId")
    .trim()
    .escape()
    .isArray()
    .withMessage("should be Array!"),
];

export default {
  taskValidation: taskValidationChain,
  updateTaskIdValidation: updateTaskIdValidationChain,
  updateTaskValidation: updateTaskValidationChain,
  deleteTaskValidation: deleteTaskValidationChain,
};
