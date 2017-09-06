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
      .then(toy => res.status(200).json(toy))
      //.catch(err => next(err));  <--line 20 is shorter version of this
      .catch(next);
  });

  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET all');

    return Toy.find()
      .then(toy => res.status(200).json(toy))
      .catch(next);
  });

  router.put('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy PUT');

    return Toy.findByIdAndUpdate(req.params._id, req.body)
      .then(toy => res.status(204).json(toy))
      .catch(next);
  });

  router.delete('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy DELETE');

    return Toy.findByIdAndRemove(req.params._id)
      //.then(toy => res.status(204).json(toy))
      .then(() => res.sendStatus(204))
      .catch(next);
  });
};

// This is how express allows dynamic routes via parameters
// http GET :3000/api/toy/1234-5678
// req.params._id => 1234-5678

// This is how our vanilla http servers were structured
// http GET :3000/api/toy?_id=1234-5678
// req.query._id => 1234-5678
