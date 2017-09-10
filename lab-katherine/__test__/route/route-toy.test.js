'use strict'

const Promise = require('bluebird')
const superagent = require('superagent')
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'})
require('../../lib/server').listen(3000)
require('jest')

describe('Testing toy routes', function() {
  describe('all requests to /api/toy', () => {


    describe('POST requests', () => {
      describe('Valid Requests', () => {
        beforeAll(done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({
              name: 'barney',
              desc: 'purple dino'
            })
            .then(res => {
              this.mockToy = res.body
              this.resPost = res
              done()
            })
        })
        test('should create and return a new toy, given a valid request', () => {
          expect(this.mockToy).toBeInstanceOf(Object)
          expect(this.mockToy).toHaveProperty('name')
          expect(this.mockToy).toHaveProperty('desc')
          expect(this.mockToy).toHaveProperty('_id')
        })
        test('should have a name, given a valid request', () => {
          expect(this.mockToy.name).toBe('barney')
        })
        test('should have a desc, given a valid request', () => {
          expect(this.mockToy.desc).toBe('purple dino')
        })
        test('should have an _id, given a valid request', () => {
          expect(this.mockToy._id).toMatch(/([a-f0-9]{24})/i)
        })
        test('should return a 201 CREATED, given a valid request', () => {
          expect(this.resPost.status).toBe(201)
        })
      })
      describe('Invalid Requests', () => {
        // TODO: error status, message, name, bad endpoint
        beforeAll(done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({})
            .catch(err => {
              this.errPost = err
              done()
            })
        })
        xtest('should return a status of 400 Bad Request', () => {
          expect(this.errPost.status).toBe(400)
          expect(this.errPost.message).toBe('Bad Request')
        })
        test('should return 404 on invalid endpoint', done => {
          superagent.post(':3000/bad/endpoint')
            .type('application/json')
            .send({})
            .catch(err => {
              expect(err.status).toBe(404)
              done()
            })
        })
      })
    })


    describe('GET requests', () => {
      describe('Valid Requets', () => {
        beforeAll(done => {
          superagent.get(`:3000/api/toy/${this.mockToy._id}`)
            .then(res => {
              this.mockToy = res.body
              this.resGet = res
              done()
            })
        })
        test('should get the record from the toy dir', done => {
          expect(this.mockToy).toBeInstanceOf(Object)
          expect(this.mockToy).toHaveProperty('name')
          expect(this.mockToy).toHaveProperty('desc')
          expect(this.mockToy).toHaveProperty('_id')
          done()
        })
        test('should have a name, given a valid request', () => {
          expect(this.mockToy.name).toBe('barney')
        })
        test('should have a desc, given a valid request', () => {
          expect(this.mockToy.desc).toBe('purple dino')
        })
        test('should have an _id, given a valid request', () => {
          expect(this.mockToy._id).toMatch(/([a-f0-9]{24})/i)
        })
        test('should return a 201 CREATED, given a valid request', () => {
          expect(this.resPost.status).toBe(201)
        })
      })
      describe('Invalid Requests', () => {
        beforeAll(done => {
          superagent.get(':3000/api/toy/death')
            .type('application/json')
            .catch(err => {
              this.errPost = err
              done()
            })
        })
        xtest('should return 404 on invalid id', done => {
          expect(this.errPost.status).toBe(404)
          expect(this.errPost.message).toBe('Bad Request')
          done()
        })
      })
    })


    describe('PUT requests', () => {
      describe.only('Valid Requests', () => {
        beforeAll(done => {
          superagent.put(`:3000/api/toy/${this.mockToy._id}`)
            .type('application/json')
            .send({
              name: 'macbook',
              desc: 'a laptop'
            })
          done()
        })
        test('should create and return a new toy, given a valid request', done => {
          beforeAll(done => {
            superagent.get(`:3000/api/toy/${this.mockToy._id}`)
              console.log('name', this.mockToy.name)
              .then(res => {
                this.mockToy = res.body
                this.resGet = res
                done()
              })
            // done()
          })
          console.log(this.mockToy)
          expect(this.mockToy).toBeInstanceOf(Object)
          expect(this.mockToy).toHaveProperty('name')
          expect(this.mockToy).toHaveProperty('desc')
          expect(this.mockToy).toHaveProperty('_id')
          done()
        })
        test('should have a name, given a valid request', () => {
          beforeAll(done => {
            superagent.get(`:3000/api/toy/${this.mockToy._id}`)
              .then(res => {
                this.mockToy = res.body
                this.resGet = res
                done()
              })
            done()
          })
          expect(this.mockToy.name).toBe('macbook pro')
        })
        test('should have a desc, given a valid request', () => {
          expect(this.mockToy.desc).toBe('purple dino')
        })
        test('should have an _id, given a valid request', () => {
          expect(this.mockToy._id).toMatch(/([a-f0-9]{24})/i)
        })
        test('should return a 201 CREATED, given a valid request', () => {
          expect(this.resPost.status).toBe(201)
        })
      })
      describe('Invalid Requests', () => {

      })
      test('should have ...', done => {

        done()
      })
    })


    describe('DELETE requests', () => {
      describe('Valid Requests', () => {
        beforeAll(done => {
          superagent.delete(`:3000/api/toy/${this.mockToy._id}`)
            .then(res => {
              this.resDelete = res
              done()
            })
        })
        test('should return a 204 No Content', () => {
          expect(this.resDelete.status).toBe(204)
        })
        test('should remove the record from the toy dir', done => {
          fs.readdirProm(`${__dirname}/../../data/toy`)
            .then(files => {
              let expectedFalse = files.includes(`${this.mockToy._id}.json`)
              expect(expectedFalse).toBeFalsy()
              done()
            })
        })
      })
      describe('Invalid Requests', () => {

      })
    })
  })
})
