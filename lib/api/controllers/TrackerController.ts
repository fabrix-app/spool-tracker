import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'
import { ModelError } from '@fabrix/spool-sequelize/dist/errors'
import { defaultsDeep, isString } from 'lodash'
import * as proxy from 'express-request-proxy'

export class TrackerController extends Controller {
  /**
   *
   */
  impression(req, res, done) {

    if (isString(req.params.id)) {
      req.body.token = req.params.id
    }
    else {
      req.body.id = req.params.id
    }

    this.app.services.TrackerResourceService.impression(req, {})
      .then(result => {
        const options = {
          url: req.query.url || result.asset
        }
        return proxy(options)(req, res, done)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }
  /**
   *
   */
  click(req, res) {
    if (isString(req.params.id)) {
      req.body.token = req.params.id
    }
    else {
      req.body.id = req.params.id
    }

    this.app.services.TrackerResourceService.click(req, {})
      .then(result => {
        const options = {
          url: req.query.url || result.refer_url
        }
        return res.redirect(options.url)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }
  /**
   *
   */
  create(req, res) {
    this.app.services.TrackerResourceService.create(req.body, {})
      .then(result => {
        return res.json(result)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }
  /**
   *
   */
  update(req, res) {
    const id = req.params.id

    req.body = {
      id,
      ...req.body
    }

    this.app.services.TrackerResourceService.update(req.body, {})
      .then(result => {
        return res.json(result)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }
  /**
   *
   */
  findById(req, res) {
    const orm = this.app.models
    const TrackerResource = orm['TrackerResource']
    TrackerResource.findById(req.params.id, {})
      .then(_trackerResource => {
        if (!_trackerResource) {
          throw new ModelError('E_NOT_FOUND', `TrackerResource id ${req.params.id} not found`)
        }
        // return this.app.services.PermissionsService.sanitizeResult(req, trackerResource)
        return _trackerResource
      })
      .then(result => {
        return res.json(result)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }

  /**
   *
   */
  findOne(req, res) {
    const orm = this.app.models
    const TrackerResource = orm['TrackerResource']
    TrackerResource.findOne({where: { id: req.params.id }}, {})
      .then(_trackerResource => {
        if (!_trackerResource) {
          throw new ModelError('E_NOT_FOUND', `TrackerResource id ${req.params.id} not found`)
        }
        // return this.app.services.PermissionsService.sanitizeResult(req, trackerResource)
        return _trackerResource
      })
      .then(result => {
        return res.json(result)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }

  /**
   *
   */
  findAll(req, res) {
    const TrackerResource = this.app.models['TrackerResource']
    const limit = Math.max(0, req.query.limit || 10)
    const offset = Math.max(0, req.query.offset || 0)
    const sort = req.query.sort || [['created_at', 'DESC']]
    const where = req.query.where
    const include = req.query.include || []

    TrackerResource.findAndCountAll({
      order: sort,
      offset: offset,
      limit: limit,
      where: where,
      include: include
    })
      .then(_trackerResources => {
        // Paginate
        res.paginate(_trackerResources.count, limit, offset, sort)
        // return this.app.services.PermissionsService.sanitizeResult(req, _trackerResources.rows)
        return _trackerResources.rows
      })
      .then(result => {
        return res.json(result)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }

  /**
   *
   */
  search(req, res) {
    const orm = this.app.models
    const TrackerResource = orm['TrackerResource']
    // const Collection = orm['Collection']
    // const Tag = orm['Tag']
    const limit = Math.max(0, req.query.limit || 10)
    const offset = Math.max(0, req.query.offset || 0)
    const sort = req.query.sort || [['title', 'DESC']]
    const term = req.query.term
    const where = req.jsonCriteria(req.query.where)
    const defaults = defaultsDeep(where, {
      $or: [
        {
          name: {
            $iLike: `%${term}%`
          }
        }
      ]
    })
    TrackerResource.findAndCountAll({
      where: defaults,
      order: sort,
      offset: offset,
      req: req,
      limit: limit
    })
      .then(_trackerResources => {
        // Paginate
        res.paginate(_trackerResources.count, limit, offset, sort)

        // return this.app.services.PermissionsService.sanitizeResult(req, _trackerResources.rows)
        return _trackerResources.rows
      })
      .then(result => {
        return res.json(result)
      })
      .catch(err => {
        return res.serverError(err)
      })
  }
}
