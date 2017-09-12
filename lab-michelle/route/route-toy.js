//Note if you see copy overs, it's me copying over from my Lab 9
'use strict';

const Toy = require('../model/toy');
const debug = require('debug')('http:route-toy');

module.exports = function (router) {

  router.post('/api/toy', (req, res, next) => {
    debug('/api/toy POST');

    return new Toy(req.body).save()
      .then(toy => res.status(201).json(toy))
      .catch(err => next(err));
  });

  router.get('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy GET');

    return Toy.findById(req.params._id)
      .then(toy => res.json(toy))
      .catch(next);
  });

  //OUR GET ALL
  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET');

    return Toy.find()
      .then(toys => res.json(toys.map(toy => toy._id)))
      .catch(next);
  });

  router.put('/api/toy/:_id', (req, res) => {
    return Toy.findByIdAndUpdate(req.params._id, req.body, {upsert: true, runValidators: true})
      .then(() => res.sendStatus(204))
      .catch(err => console.log(err.message));
  });

  router.delete('/api/toy/:_id', (req, res, next) => {
    debug('/api/data DELETE');
    return Toy.findByIdAndRemove(req.params._id)
      .then(() => res.status(204))
      .catch(next);
  });
};
