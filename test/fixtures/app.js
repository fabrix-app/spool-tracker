'use strict'

module.exports = {
  pkg: {
    name: require('../../package').name + '-test'
  },
  api: {
    models: {},
    controllers: {},
    services: {}
  },
  config: {
    stores: {
      postgres: {
        orm: 'sequelize',
        database: 'Sequelize',
        host: '127.0.0.1',
        dialect: 'postgres',
        logging: true,
        migrate: 'drop'
      }
    },
    models: {
      defaultStore: 'postgres',
      migrate: 'drop'
    },
    tracker: {

    },
    web: {
      express: require('express'),
      middlewares: {
        order: [
          'static',
          'addMethods',
          'cookieParser',
          'session',
          'bodyParser',
          'methodOverride',
          'helmet',
          'router',
          'www',
          '404',
          '500'
        ],
        // static: require('express').static('test/static')
      }
    },
    session: {
      secret: 'tracker'
    },
    main: {
      spools: [
        require('@fabrix/spool-router').RouterSpool,
        require('@fabrix/spool-express').ExpressSpool,
        require('@fabrix/spool-sequelize').SequelizeSpool,
        require('@fabrix/spool-crons').CronsSpool,
        require('@fabrix/spool-analytics').AnalyticsSpool,
        require('../../dist').TrackerSpool
      ]
    }
  }
}


