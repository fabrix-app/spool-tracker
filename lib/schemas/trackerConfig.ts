import * as joi from 'joi'

export const trackerConfig = joi.object().keys({
  prefix: joi.string().allow('', null)
}).unknown()
