import * as Joi from 'joi';

export default Joi.object({
  // Server config
  NODE_ENV: Joi.string().valid('development', 'production', 'test'),

  // TypeOrm config
  NEST_APP_PORT: Joi.number().default(3001),
  NEST_APP_TYPEORM_HOST: Joi.string().required(),
  NEST_APP_TYPEORM_USERNAME: Joi.string().required(),
  NEST_APP_TYPEORM_PASSWORD: Joi.string().required(),
  NEST_APP_TYPEORM_PORT: Joi.number().required(),
  NEST_APP_TYPEORM_DATABASE: Joi.string().required(),
  NEST_APP_TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),

  // Jwt config
  JWT_SECRET_KEY: Joi.string().required(),
});
