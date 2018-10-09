import { FabrixService as Service } from '@fabrix/fabrix/dist/common'

export class TrackerResourceService extends Service {
  /**
   *
   */
  impression(req, options: {[key: string]: any} = {}) {
    //
    options = {
      attributes: ['id', 'impressions'],
      ...options
    }
    return this.app.models.TrackerResource.resolve(req.body, options)
      .then(_resource => {
        return _resource.increment('impressions', { transaction: options.transaction || null})
      })
      .then(_resource => {
        return this.app.models.TrackerResourceEvent.create({
          tracker_resource_id: _resource.id,
          type: 'impression',
          client_details: req.body.client_details
        }, { transaction: options.transaction || null})
      })
  }

  /**
   *
   */
  click(req, options: {[key: string]: any} = {}) {
    //
    options = {
      attributes: ['id', 'clicks'],
      ...options
    }
    return this.app.models.TrackerResource.resolve(req.body, options)
      .then(_resource => {
        return _resource.increment('clicks', { transaction: options.transaction || null})
      })
      .then(_resource => {
        return this.app.models.TrackerResourceEvent.create({
          tracker_resource_id: _resource.id,
          type: 'click',
          client_details: req.body.client_details
        }, { transaction: options.transaction || null})
      })
  }

  /**
   *
   */
  create(tracker, options: {[key: string]: any} = {}) {
    return this.app.models.TrackerResource.create(
      tracker,
      options
    )
  }

  /**
   *
   */
  update(tracker, options: {[key: string]: any} = {}) {
    return this.app.models.TrackerResource.resolve(tracker, options)
      .then(_tracker => {
        return _tracker.update(tracker, options)
      })
  }
}
