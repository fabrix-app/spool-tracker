import * as joi from 'joi'

import { resource } from '../schemas'

export const routes = {
  '/resource/:id': {
    'GET': {
      handler: 'TrackerController.findOne',
      prefix: 'tracker.prefix',
      config: {
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
            roles: ['admin']
          }
        }
      }
    },
    'PUT': {
      handler: 'TrackerController.update',
      prefix: 'tracker.prefix',
      config: {
        validate: {
          params: {
            id: joi.alternatives().try(
              joi.number(),
              joi.string()
            )
          },
          payload: resource.update,
          query: {
            url: joi.string()
          }
        },
        app: {
          permissions: {
            resource_name: 'apiPutResourceIdRoute',
            roles: ['admin']
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
            ),
            payload: resource.click
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
  },
  '/resource/:id/impression': {
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
          },
          payload: resource.impression,
          query: {
            url: joi.string()
          }
        },
        app: {
          permissions: {
            resource_name: 'apiGetResourceIdImpressionRoute',
            roles: ['admin', 'registered', 'public']
          }
        }
      }
    }
  },
  '/resource/:id/analytics': {
    'GET': {
      handler: 'TrackerController.analytics',
      prefix: 'tracker.prefix',
      config: {
        pre: [],
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
            resource_name: 'apiGetResourceIdAnalyticsRoute',
            roles: ['admin']
          }
        }
      }
    }
  },
  '/resources': {
    'GET': {
      handler: 'TrackerController.findAll',
      prefix: 'tracker.prefix',
      config: {
        validate: {
          query: {
            offset: joi.number(),
            limit: joi.number(),
            sort: joi.array().items(joi.array()),
            where: joi.any().optional(),
            include: joi.array().items(joi.string())
          }
        },
        app: {
          permissions: {
            resource_name: 'apiGetResourcesRoute',
            roles: ['admin']
          }
        }
      }
    },
    'POST': {
      handler: 'TrackerController.create',
      prefix: 'tracker.prefix',
      config: {
        validate: {
          //
          payload: resource.create
        },
        app: {
          permissions: {
            resource_name: 'apiPostResourcesRoute',
            roles: ['admin']
          }
        }
      }
    }
  },
  '/resources/search': {
    'GET': {
      handler: 'TrackerController.search',
      prefix: 'tracker.prefix',
      config: {
        validate: {
          query: {
            offset: joi.number(),
            limit: joi.number(),
            sort: joi.array().items(joi.array()),
            where: joi.any().optional(),
            term: joi.any(),
            include: joi.array().items(joi.string())
          }
        },
        app: {
          permissions: {
            resource_name: 'apiGetResourcesSearchRoute',
            roles: ['admin']
          }
        }
      }
    }
  }
}
