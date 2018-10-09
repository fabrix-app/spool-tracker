import * as joi from 'joi'

export const resource = joi.object().keys({
  name: joi.string()
}).unknown()
