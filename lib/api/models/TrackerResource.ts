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
      // The amount of the credit or debit
      impressions: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
