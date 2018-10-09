import { FabrixModel as Model } from '@fabrix/fabrix/dist/common'
import { SequelizeResolver } from '@fabrix/spool-sequelize'
import { ModelError } from '@fabrix/spool-sequelize/dist/errors'
import * as shortId from 'shortid'
import { isObject, isNumber, isString, defaults, defaultsDeep } from 'lodash'

/**
 * @module TrackerResource
 * @description Saves Account Balance updates to accounts/customer

 */
export class TrackerResourceResolver extends SequelizeResolver {
  /**
   * Batch Edit
   */
  // batch(options, batch) {
  //   const self = this
  //
  //   options.limit = options.limit || 100
  //   options.offset = options.offset || 0
  //   options.regressive = options.regressive || false
  //
  //   const recursiveQuery = function(options) {
  //     let count = 0
  //     return self.findAndCountAll(options)
  //       .then(results => {
  //         count = results.count
  //         return batch(results.rows)
  //       })
  //       .then(batched => {
  //         if (count >= (options.regressive ? options.limit : options.offset + options.limit)) {
  //           options.offset = options.regressive ? 0 : options.offset + options.limit
  //           return recursiveQuery(options)
  //         }
  //         else {
  //           return Promise.resolve()
  //         }
  //       })
  //   }
  //   return recursiveQuery(options)
  // }
  /**
   * Resolve by instance Function
   * @param trackerResource
   * @param options
   */
  resolveByInstance(trackerResource, options: {[key: string]: any} = {}) {
    return Promise.resolve(trackerResource)
  }
  /**
   * Resolve by id Function
   * @param trackerResource
   * @param options
   */
  resolveById(trackerResource, options: {[key: string]: any} = {}) {
    return this.findById(trackerResource.id, options)
      .then(resTrackerResource => {
        if (!resTrackerResource && options.reject !== false) {
          throw new ModelError('E_NOT_FOUND', `TrackerResource ${trackerResource.id} not found`)
        }
        return resTrackerResource
      })
  }

  /**
   * Resolve by token Function
   * @param trackerResource
   * @param options
   */
  resolveByToken(trackerResource, options: {[key: string]: any} = {}) {
    return this.findOne(defaultsDeep({
      where: {
        token: trackerResource.token
      }
    }, options))
      .then(resTrackerResource => {
        if (!resTrackerResource && options.reject !== false) {
          throw new ModelError('E_NOT_FOUND', `TrackerResource token ${trackerResource.token} not found`)
        }
        return resTrackerResource
      })
  }
  /**
   * Resolve by number Function
   * @param trackerResource
   * @param options
   */
  resolveByNumber(trackerResource, options: {[key: string]: any}  = {}) {
    return this.findById(trackerResource, options)
      .then(resTrackerResource => {
        if (!resTrackerResource && options.reject !== false) {
          throw new ModelError('E_NOT_FOUND', `TrackerResource ${trackerResource.token} not found`)
        }
        return resTrackerResource
      })
  }
  /**
   * Resolve by string Function
   * @param trackerResource
   * @param options
   */
  resolveByString(trackerResource, options: {[key: string]: any} = {}) {
    return this.findOne(defaultsDeep({
      where: {
        token: trackerResource
      }
    }, options))
      .then(resTrackerResource => {
        if (!resTrackerResource && options.reject !== false) {
          throw new ModelError('E_NOT_FOUND', `TrackerResource ${trackerResource} not found`)
        }
        return resTrackerResource
      })
  }
  /**
   * Primary Resolve Function
   * @param trackerResource
   * @param options
   */
  resolve(trackerResource, options: {[key: string]: any} = {}) {
    const resolvers = {
      'instance': trackerResource instanceof this.instance,
      'id': !!(trackerResource && isObject(trackerResource) && trackerResource.id),
      'token': !!(trackerResource && isObject(trackerResource) && trackerResource.token),
      'number': !!(trackerResource && isNumber(trackerResource)),
      'string': !!(trackerResource && isString(trackerResource))
    }
    const type = Object.keys(resolvers).find((key) => resolvers[key])

    switch (type) {
      case 'instance': {
        return this.resolveByInstance(trackerResource, options)
      }
      case 'id': {
        return this.resolveById(trackerResource, options)
      }
      case 'token': {
        return this.resolveByToken(trackerResource, options)
      }
      case 'number': {
        return this.resolveByNumber(trackerResource, options)
      }
      case 'string': {
        return this.resolveByString(trackerResource, options)
      }
      default: {
        // TODO create proper error
        const err = new Error(`Unable to resolve TrackerResource ${trackerResource}`)
        return Promise.reject(err)
      }
    }
  }

  resolveOrCreate(trackerResource, options: {[key: string]: any} = {}) {
    options.reject = false
    return this.resolve(trackerResource, options)
      .then(_trackerResource => {
        if (!_trackerResource) {
          return this.create(trackerResource, {transaction: options.transaction || null})
            .then(_createdTrackerResource => {
              return [_createdTrackerResource, true]
            })
        }
        else if (_trackerResource.isNewRecord && !_trackerResource.id) {
          return this.findOrCreate({
            where: {
              ein: _trackerResource.ein
            },
            transaction: options.transaction || null,
            defaults: _trackerResource.get({plain: true})
          })
            .then(([_resTrackerResource, created]) => {
              return [_resTrackerResource, created]
            })
        }
        else {
          return [_trackerResource, false]
        }
      })
  }
}

export class TrackerResource extends Model {

  static get resolver() {
    return TrackerResourceResolver
  }

  static config (app, Sequelize) {
    return {
      options: {
        underscored: true,
        // enums: {
        //   // ACCOUNT_EVENT_TYPE: ACCOUNT_EVENT_TYPE
        // }
        hooks: {
          beforeCreate: (resource, options) => {
            if (!resource.token) {
              resource.token = `r_${shortId.generate()}`
            }
          }
        }
      }
    }
  }

  static schema (app, Sequelize) {
    return {
      token: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      asset: {
        type: Sequelize.STRING
      },
      refer_url: {
        type: Sequelize.STRING
      },
      // The amount of views/impressions
      impressions: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      // The amount of interactions/clicks
      clicks: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      value: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      metadata: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      client_details: {
        type: Sequelize.JSONB,
        defaultValue: {}
      }
    }
  }

  /**
   * Associate the Model
   * @param models
   */
  public static associate(models) {
    models.TrackerResource.hasMany(models.TrackerResourceEvent, {
      as: 'events',
      foreignKey: 'tracker_resource_id'
    })
  }
}
