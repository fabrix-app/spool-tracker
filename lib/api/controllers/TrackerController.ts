import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

export class TrackerController extends Controller {
  //
  impression(req, res) {
    //
    this.app.services.TrackerResourceService.impression(req, {})
      .then(result => {

      })
      .catch(err => {
        return res.serverError(err)
      })
  }
  click(req, res) {
    this.app.services.TrackerResourceService.click(req, {})
      .then(result => {

      })
      .catch(err => {
        return res.serverError(err)
      })
  }
  create(req, res) {
    this.app.services.TrackerResourceService.create(req.body, {})
      .then(result => {

      })
      .catch(err => {
        return res.serverError(err)
      })
  }
  update(req, res) {
    const id = req.params.id

    req.body = {
      id,
      ...req.body
    }

    this.app.services.TrackerResourceService.update(req.body, {})
      .then(result => {

      })
      .catch(err => {
        return res.serverError(err)
      })
  }
  findOne(req, res) {}
  findAll(req, res) {}
  search(req, res) {}
}
