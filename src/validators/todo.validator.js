import Joi from "joi";
import defaultValidator from "./default.validator";

const create = defaultValidator({
  body: Joi.object({
    todo: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().min(10).max(250).required(),
      email: Joi.string().required(),
      dueDate: Joi.date().iso().required(),
    }).required(),
  }),
});

const TodoValidator = {
  create,
};

export { TodoValidator };
