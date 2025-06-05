import Joi from "joi";

const categorySchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  icon: Joi.string().optional(),
  color: Joi.string().optional(),
});

export default function validateCategory(req, res, next) {
  const { error } = categorySchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  next();
}
