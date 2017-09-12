//Note if you see copy overs, it's me copying over from my Lab 9
'use strict';

const Toy = require('../model/toy');
const debug = require('debug')('http:route-toy');
const errorHandler = require('../lib/error-middleware');

module.exports = function (router) {

  router.post('/api/toy', (req, res) => {
    debug('/api/toy POST');

    return new Toy(req.body).save()
      .then(toy => res.status(201).json(toy))
      .catch(err => errorHandler(err, req, res))
  });

  router.get('/api/toy/:_id', (req, res) => {
    debug('/api/toy GET');

    return Toy.findById(req.params._id)
      .then(toy => res.json(toy))
      .catch(err => errorHandler(err, req, res));
  });

  //OUR GET ALL
  router.get('/api/toy', (req, res) => {
    debug('/api/toy GET');

    return Toy.find()
      .then(toys => res.json(toys.map(toy => toy._id)))
      .catch(err => errorHandler(err, req, res));
  });

  router.put('/api/toy/:_id', (req, res) => {
    return Toy.findByIdAndUpdate(req.params._id, req.body, {upsert: true, runValidators: true})
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });

  router.delete('/api/toy/:_id', (req, res) => {
    debug('/api/data DELETE');
    return Toy.findByIdAndRemove(req.params._id)
      .then(() => res.sendStatus(204))
      .catch(err => errorHandler(err, req, res));
  });
};
