'use strict'
/* global describe, it */
const assert = require('assert')

describe('TrackerResource Model', () => {
  let TrackerResource
  it('should exist', () => {
    TrackerResource = global.app.models['TrackerResource']
    assert(TrackerResource)
    assert.ok(TrackerResource.resolve)
    assert.ok(TrackerResource.resolveOrCreate)
  })
})
