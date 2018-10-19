'use strict'
/* global describe, it */
const assert = require('assert')
const supertest = require('supertest')
// const _ = require('lodash')
// const qs = require('qs')

describe('Admin User ProductController', () => {
  let adminUser, resourceID, resourceToken

  before((done) => {

    adminUser = supertest.agent(global.app.spools.express.server)
    done()
    // Login as Admin
    // adminUser
    //   .post('/auth/local')
    //   .set('Accept', 'application/json') //set header for this test
    //   .send({username: 'admin', password: 'admin1234'})
    //   .expect(200)
    //   .end((err, res) => {
    //     assert.ok(res.body.user.id)
    //     done(err)
    //   })
  })
  it('should exist', () => {
    assert(global.app.api.controllers['TrackerController'])
  })

  it('should make create resource post adminUser', (done) => {
    adminUser
      .post('/resources')
      .send(
        {
          name: 'test'
        }
      )
      .expect(200)
      .end((err, res) => {
        // Resource
        assert.ok(res.body.id)
        assert.ok(res.body.token)
        assert.equal(res.body.name, 'test')
        resourceToken = res.body.token
        resourceID = res.body.id
        done(err)
      })
  })

  it('should make update resource put adminUser', (done) => {
    adminUser
      .put(`/resource/${resourceID}`)
      .send(
        {
          name: 'test2'
        }
      )
      .expect(200)
      .end((err, res) => {
        // Resource
        assert.ok(res.body.id)
        assert.ok(res.body.token)
        assert.equal(res.body.name, 'test2')
        done(err)
      })
  })
  it('should make impression on resource get adminUser', (done) => {
    adminUser
      .get(`/resource/${resourceToken}/impression`)
      .query({
        url: 'https://via.placeholder.com/350x150'
      })
      .expect(200)
      .end((err, res) => {
        // Resource
        assert.ok(res.body)
        assert.ok(res.headers['content-type'])
        assert.equal(res.headers['content-type'], 'image/png')
        done(err)
      })
  })
  it('should make click on resource get adminUser', (done) => {
    adminUser
      .get(`/resource/${resourceToken}/click`)
      .query({
        url: 'https://google.com'
      })
      .expect(302)
      .end((err, res) => {
        // Resource
        done(err)
      })
  })
  it('should get resource clicks, impressions adminUser', (done) => {
    adminUser
      .get(`/resource/${resourceID}`)
      .expect(200)
      .end((err, res) => {
        // Resource
        assert.ok(res.body.id)
        assert.ok(res.body.token)
        assert.equal(res.body.name, 'test2')
        assert.equal(res.body.impressions, 1)
        assert.equal(res.body.clicks, 1)
        done(err)
      })
  })
})
