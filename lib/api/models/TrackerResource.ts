import { FabrixModel as Model } from '@fabrix/fabrix/dist/common'
import { SequelizeResolver } from '@fabrix/spool-sequelize'
// import { values } from 'lodash'
// import { ACCOUNT_EVENT_TYPE } from '../../enums'
/**
 * @module TrackerResource
 * @description Saves Account Balance updates to accounts/customer

 */
export class TrackerResource extends Model {

  static get resolver() {
    return SequelizeResolver
  }

  static config (app, Sequelize) {
    return {
      options: {
        underscored: true,
        // enums: {
        //   // ACCOUNT_EVENT_TYPE: ACCOUNT_EVENT_TYPE
        // }
      }
    }
  }

  static schema (app, Sequelize) {
    return {
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
    //
  }
}
