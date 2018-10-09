import { FabrixModel as Model } from '@fabrix/fabrix/dist/common'
import { SequelizeResolver } from '@fabrix/spool-sequelize'
// import { values } from 'lodash'
// import { ACCOUNT_EVENT_TYPE } from '../../enums'
/**
 * @module TrackerResourceEvent
 * @description Saves Account Balance updates to accounts/customer

 */
export class TrackerResourceEvent extends Model {

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
      tracker_resource_id: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
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
    models.TrackerResourceEvent.belongsTo(models.TrackerResource, {
      //
      foreignKey: 'tracker_resouce_id'
    })
  }
}
