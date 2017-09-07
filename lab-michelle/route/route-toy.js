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
      .then(ids => res.json(ids))
      .catch(next);
  });

  //need to refactor
  router.put('/api/toy', (req, res) => {
    //I know this doesn't work but it's something like this
    //findbyIdAnd
    let selected = Toy.findById(req.params._id);
    Toy.save()
      .then((toy) => res.status(204))
      .catch(err => next(err));
  });

  //need to refactor
  router.delete('/api/toy', (req, res) => {
    debug('/api/data DELETE');
    let selected = Toy.findById(req.params._id);
    selected.remove()
      .then(() => res.status(204))
      .catch(next);
  });
};
