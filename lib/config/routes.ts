import * as joi from 'joi'

export const routes = {
  '/resource/:id': {
    'GET': {
      handler: 'TrackerController.impression',
      prefix: 'tracker.prefix',
      config: {
        pre: ['TrackerPolicy.impression'],
        validate: {
          params: {
            id: joi.alternatives().try(
              joi.number(),
              joi.string()
            )
          }
        },
        app: {
          permissions: {
            resource_name: 'apiGetResourceIdRoute',
            roles: ['admin', 'registered', 'public']
          }
        }
      }
    }
  },
  '/resource/:id/click': {
    'GET': {
      handler: 'TrackerController.click',
      prefix: 'tracker.prefix',
      config: {
        pre: ['TrackerPolicy.click'],
        validate: {
          params: {
            id: joi.alternatives().try(
              joi.number(),
              joi.string()
            )
          }
        },
        app: {
          permissions: {
            resource_name: 'apiGetResourceIdClickRoute',
            roles: ['admin', 'registered', 'public']
          }
        }
      }
    }
  }
}
