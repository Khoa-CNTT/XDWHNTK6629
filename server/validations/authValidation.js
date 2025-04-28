import Joi from "joi";

// Common validation schema for all users
const commonSchema = Joi.object({
  fullName: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// Export validation middleware
export const validateAuth = (req, res, next) => {
  const { error } = commonSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  next();
};
