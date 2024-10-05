import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB_URL: Joi.required(),
  PORT: Joi.number().default(4000),
  DEFAULT_LIMIT: Joi.required().default(6), // ESTA ES SOBRE ESCRIBE LO QUE TENGA EN MI app.config
});
