'use strict'
/* global describe, it */
const assert = require('assert')

describe('TrackerResourceEvent Model', () => {
  let TrackerResourceEvent
  it('should exist', () => {
    TrackerResourceEvent = global.app.models['TrackerResourceEvent']
    assert(TrackerResourceEvent)
  })
})
