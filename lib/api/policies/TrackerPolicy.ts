import { FabrixPolicy as Policy } from '@fabrix/fabrix/dist/common'

export class TrackerPolicy extends Policy {
  /**
   * Impression Policiy
   */
  impression(req, res, next) {
    //
    // Init Client Details
    const clientDetails = {
      host: req.headers.host,
      browser_ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      accept_language: req.headers['accept-language'],
      user_agent: req.headers['user-agent'],
      browser_height: req.body.client_details ? req.body.client_details.browser_height : null,
      browser_width: req.body.client_details ? req.body.client_details.browser_width : null,
      session_hash: '', // TODO get session_hash
      latitude: req.body.client_details ? req.body.client_details.latitude : null,
      longitude: req.body.client_details ? req.body.client_details.longitude : null
    }
    // Attach values to the request body
    req.body.ip = clientDetails.browser_ip
    req.body.client_details = clientDetails
    // TODO enable Multi Tenant
    // req.body.host = req.params.host
    this.app.log.silly('TrackerPolicy.impression', clientDetails)
    next()
  }

  /**
   * Click Policy
   */
  click(req, res, next) {
    //
    // Init Client Details
    const clientDetails = {
      host: req.headers.host,
      browser_ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
      accept_language: req.headers['accept-language'],
      user_agent: req.headers['user-agent'],
      browser_height: req.body.client_details ? req.body.client_details.browser_height : null,
      browser_width: req.body.client_details ? req.body.client_details.browser_width : null,
      session_hash: '', // TODO get session_hash
      latitude: req.body.client_details ? req.body.client_details.latitude : null,
      longitude: req.body.client_details ? req.body.client_details.longitude : null
    }
    // Attach values to the request body
    req.body.ip = clientDetails.browser_ip
    req.body.client_details = clientDetails
    // TODO enable Multi Tenant
    // req.body.host = req.params.host
    this.app.log.silly('TrackerPolicy.click', clientDetails)
    next()
  }
}
