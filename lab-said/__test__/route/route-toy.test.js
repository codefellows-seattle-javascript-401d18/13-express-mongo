'use strict';

const superagent = require('superagent');

require('../lib/server').listen(3000);
require('jest');

describe('Testing toy routes', function() {
  describe('all requests to /api/toy', () => {
    describe('POST requests', () => {
      describe('Valid Requests', () => {
        beforeAll(done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({
              name: 'barney',
              desc: 'purple dino',
            })
            .then(res => {
              this.mockToy = res.body;
              this.resPost = res;
              done();
            });
        });
        test('should create and return a new toy, given a valid request', () => {
          expect(this.mockToy).toBeInstanceOf(Object);
          expect(this.mockToy).toHaveProperty('name');
          expect(this.mockToy).toHaveProperty('desc');
          expect(this.mockToy).toHaveProperty('_id');
        });
        test('should have a name, given a valid request', () => {
          expect(this.mockToy.name).toBe('barney');
        });
        test('should have a desc, given a valid request', () => {
          expect(this.mockToy.desc).toBe('purple dino');
        });
        test('should have an _id, given a valid request', () => {
          expect(this.mockToy._id).not.toBeNull();
        });
        test('should return a 201 , given a valid request', () => {
          expect(this.resPost.status).toBe(201);
        });
      });

      describe('Invalid Requests', () => {
        beforeAll(done => {
          superagent.post(':3000/api/toy')
            .type('application/json')
            .send({})
            .catch(err => {
              this.errPost = err;
              done();
            });
        });
        test('should return a status of 400 Bad Request', () => {
          expect(this.errPost.status).toBe(500);
          expect(this.errPost.message).toBe('Internal Server Error');
        });
        test('should return 404 on invalid endpoint', done => {
          superagent.post(':3000/bad/endpoint')
            .type('application/json')
            .send({})
            .catch(err => {
              expect(err.status).toBe(404);
              done();
            });
        });
      });
    });

    describe('GET requests', () => {
      describe('Valid Requests for specific ID', () => {
        test('should get the record from the toy dir', done => {
          superagent.get(`localhost:3000/api/toy/${this.mockToy._id}`)
            .type('application/json')
            .end((err, res) => {
              expect(res.body.name).toEqual('barney');
              expect(res.body.desc).toEqual('purple dino');
              expect(res.status).toEqual(200);
              done();
            });
        });
      });

      describe('Valid Requests for all documents', () => {
        test('should get the record from the toy dir', done => {
          superagent.get(`localhost:3000/api/toy`)
            .type('application/json')
            .end((err, res) => {
              expect(res.body[res.body.length -1]).toEqual(this.mockToy._id);
              expect(res.status).toEqual(200);
              done();
            });
        });
      });
      
      describe('Invalid Requests', () => {
        test('should return 500 for bad ID', done => {
          superagent.get(`localhost:3000/api/toy/33533636`)
            .type('application/json')
            .end((err, res) => {
              expect(res.status).toEqual(500);
              done();
            });
        });
        test('should return 404 error for bad endpoint', done => {
          superagent.get(`localhost:3000/toy/toy/33533636`)
            .type('application/json')
            .end((err, res) => {
              expect(res.status).toEqual(404);
              done();
            });
        });
      });
    });
  });
});
