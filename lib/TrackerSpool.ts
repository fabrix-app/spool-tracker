import { ExtensionSpool } from '@fabrix/fabrix/dist/common/spools/extension'
import { Tracker } from './tracker'
import { Validator } from './validator'

import * as config from './config/index'
import * as pkg from '../package.json'
import * as api  from './api/index'

export class TrackerSpool extends ExtensionSpool {
  public tracker: {[key: string]: any} = {}
  constructor(app) {
    super(app, {
      config: config,
      pkg: pkg,
      api: api
    })

    this.extensions = {
      tracker: {
        get: () => {
          return this.tracker
        },
        set: (newInstances) => {
          // this.tracker = newInstances
          throw new Error('tracker can not be set through FabrixApp, check spool-tracker instead')
        },
        enumerable: true,
        configurable: true
      }
    }
  }

  /**
   * Validate Configuration
   */
  async validate () {
    // const requiredSpools = [ 'router' ]
    // const spools = Object.keys(this.app.spools)
    //
    // if (!spools.some(v => requiredSpools.indexOf(v) >= 0)) {
    //   return Promise.reject(new Error(`spool-tracker requires spools: ${ requiredSpools.join(', ') }!`))
    // }

    if (!this.app.config.get('tracker')) {
      return Promise.reject(new Error('No configuration found at config.tracker!'))
    }

    return Promise.all([
      Validator.validateTrackerConfig(this.app.config.get('tracker'))
    ])
      .catch(err => {
        return Promise.reject(err)
      })
  }

  /**
   * Check if there some stores, if not set a default one
   */
  configure() {
    this.tracker = {}
  }

  /**
   * create caching stores
   */
  async initialize() {
    return Tracker.init(this.app)
  }

  /**
   * unload caching stores
   */
  async unload() {
    return Tracker.unload(this.app)
  }
}
