'use strict';

// const Toy = require('../../model/toy');
const superagent = require('superagent');
require('jest');
require('../lib/server').listen(3000);

describe('Testing toy routes', function() {
  describe('all requests to /api/toy', () => {
    describe('POST reqs', () => {
      describe('Valid reqs', () => {
        beforeAll(() => {
          return superagent.post(`:3000/api/toy`)
            .send({name:'Hammy', desc: 'pink stuffed pig'})
            .then(res => {
              this.mockToy = res.body;
              this.resPost = res;
            });
        });
        test('should return create and return a new toy, given a valid request', ()=> {
          expect(this.mockToy).toBeInstanceOf(Object);
          expect(this.mockToy).toHaveProperty('name');
          expect(this.mockToy).toHaveProperty('desc');
          expect(this.mockToy).toHaveProperty('_id');
        });
        test('should have a desc, given a valid req', ()=> {
          expect(this.mockToy.name).toBe('Hammy');
        });
      });
      describe('Invalid Reqs', ()=> {
        test('should not return a newly created toy', () => {
          return superagent.post(`:3000/api/toy`)
            .send({})
            .catch(err => {
              expect(err.status).toBe(500);
            });
        });




      });
      describe('GET reqs', () => {
        describe('Valid reqs', () => {
          test('should get a toy given a valid request', done => {
            superagent.get(`:3000/api/toy/${this.mockToy._id}`)
            .type('application/json')
            .then(res => {
              this.res = res;
              expect(res.body).toHaveProperty('name');
              expect(res.body).toHaveProperty('desc');
              expect(res.status).toBe(200);
              done();
            });
          });
        });
        describe('Invalid reqs', () => {
          test('should not get a valid thing', () => {
            return superagent.get(`:3000/api/toy/2462456`)
            .catch(res => {
              expect(res.status).toBe(500);
            });
          });
        });
      });

      describe('GET all the items', () => {
        describe('Valid reqs', () => {
          test('should get an array of toys given a valid req', done => {
            superagent.get(`:3000/api/toy`)
            .type('application/json')
            .then(res => {
              this.res = res;
              expect(res.body).toBeInstanceOf(Array);
              done();
            });
          });
        });
        describe('Invalid reqs', () => {
          test('should not get a valid thing', function() {
            return superagent.get(`:3000/api/toy/1324235`)
            .catch(res => {
              expect(res.status).toBe(500);
            });
          });
        });
      });
    });
    describe('PUT reqs', function() {
      beforeAll(() => {
        return superagent.post(`:3000/api/toy`)
        .send({name:'Moana', desc: 'sailor lady'})
        .then(res => {
          this.resPost = res;
          console.log(res.body);
        });
      });
      afterAll(() => {
        return Promise.all([
          Toy.remove(),
        ]);
      });
      describe('Valid reqs', () => {
        test('should return a status of 204 No Content', done=> {
          console.log(this.resPost.body._id);
          superagent.put(`:3000/api/toy/${this.resPost.body._id}`)
          // .type('application/json')
          .send({name: 'Moana', desc:'cat person'})
          .then(res => {
            console.log(res);
            expect(res.status).toBe(204);
            done();
          });
        });
        test('should update the existing record in the DB', () => {
          return superagent.get(`:3000/api/toy/${this.resPost.body._id}`)
          .then(res => {
            expect(res.body.name).toBe('Moana');
            expect(res.body.desc).toBe('cat person');
          });
        });
      });
      describe('Invalid reqs', () => {
        test('should return a 500 error', done => {
          superagent.put(':3000/api/toy')
          .type('application/json')
          .send({})
          .catch(err => {
            expect(err.status).toBe(400);
          })
          done();
        });
      });
    });
    describe('DELETE reqs', ()=> {
      describe('Valid reqs', ()=> {
        beforeAll( done => {
          superagent.delete(`:3000/api/toy/${this.mockToy._id}`)
          .then(res => {
            this.resDelete = res;
            done();
          });
        });
        test('should return a 204 No Content', () => {
          expect(res.status).toBe(204);
        });
      });
      describe('Invalid reqs', ()=> {
        test('should return 404', done => {
          superagent.delete(':3000/api/toy')
          .query({_id: 'abionnarog'})
          .catch(res => {
            expect(res.status).toBe(500);
            done();
          });
        });
      });
    });
  });
});
