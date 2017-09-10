'use strict';

const Toy = require('../../model/toy');
const superagent = require('superagent');
require('jest');
require('../lib/server').listen(3000);

describe('Testing toy routes', function() {
  describe('all requests to /api/toy', () => {
    describe('POST reqs', () => {
      describe('Valid reqs', () => {
        test//thing here
      });
      describe('Invalid Reqs', ()=> {
        //a test here
      });
    });

    describe('GET reqs', () => {
      describe('Valid reqs', () => {
        //a test here
      });
      describe('Invalid reqs', () => {
        //a test here
      });
    });

    describe('PUT reqs', function() {
      beforeAll(() => {
        return superagent.post(`:3000/api/toy`)
        .send({name:'Moana', desc: 'sailor lady'})
        .then(res => {
          this.resPost = res;
        });
      });
      afterAll(() => {
        return Promise.all([
          Toy.remove();
        ]);
      });
      describe('Valid reqs', () => {
        test('should return a status of 204 No Content', ()=> {
          return superagent.put(`:3000/api/toy/${this.resPost.body._id}`)
          .send({name: 'Moana', desc:'Badass wayfinder'})
          .then(res => {
            expect(res.status).toBe(204);
          });
          test('should update the existing record in the DB', () => {
            return superagent.get(`:3000/api/toy/${this.resPost.body._id}`)
            .then(res => {
              expect(res.body.name).toBe('Moana')
              expect(res.body.desc).toBe('Badass wayfinder')
            });
          });
        });
        describe('Invalid reqs', () => {
          //test here
        });
      });
      describe('DELETE reqs', ()=> {
        describe('Valid reqs', ()=> {
          //test here
        });
        describe('Invalid reqs', ()=> {
          //test here
        });
      });
    });
  });
