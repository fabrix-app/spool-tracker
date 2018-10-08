/* eslint no-console: [0] */
'use strict'

const joi = require('joi')
import { trackerConfig } from './schemas'

export const Validator = {

  // Validate Tracker Config
  validateTrackerConfig (config) {
    return new Promise((resolve, reject) => {
      joi.validate(config, trackerConfig, (err, value) => {
        if (err) {
          return reject(new TypeError('config.tracker: ' + err))
        }
        return resolve(value)
      })
    })
  }
}
