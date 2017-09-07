'use strict';

const Toy = require('../model/toy');
const debug = require('debug')('http:route-toy');

module.exports = function(router) {
  router.post('/api/toy', (req, res, next) => {
    debug('/api/toy POST');

    return new Toy(req.body).save()
      .then(toy => res.status(201).json(toy))
      .catch(err => next(err));
  });

  router.get('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy/:_id GET');

    return Toy.findById(req.params._id)
      .then(toy => res.json(toy.map(toy => toy._id)))//added during code review
      .catch(next);
  });

  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET');
    //
    // return storage.fetchAll()
    //   .then(ids => res.json(ids))
    //   .catch(next)
  });

  //Said was a huge help here
  router.put('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy PUT');

    return Toy.findByIdAndUpdate(req.params._id, req.body, { upsert: true, runValidators: true }) //then pass in a few options in {}. new takes a boolean value. upsert, set it to true. If we don't have the run validators and we run a findbyIDandUpdate. this helps validate that if hte string has been changed to a number (mutated), we need to still make sure we meet that criteria.
    //upsert - update/insert- if true and no records match the query, insert update as a new record.
      .then((toy) => res.json(toy))
      .catch(next);
  });

  router.delete('/api/toy/', (req, res, next) => { //an isAdmin module after toy could be used to only let an admin drop a full db //don't need :_id after toy?
    debug('/api/toy DELETE');

    return Toy.findByIdAndRemove(req.params._id)
      .then(() => res.sendStatus(204))
      .catch(next);
  });
};
