'use strict'
/* global describe, it */
const assert = require('assert')

describe('TrackerResourceService Service', () => {
  let TrackerResourceService
  it('should exist', () => {
    TrackerResourceService = global.app.services['TrackerResourceService']
    assert(TrackerResourceService)
  })
})
