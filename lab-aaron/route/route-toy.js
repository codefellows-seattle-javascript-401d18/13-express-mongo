'use strict';

const storage = require('../lib/storage');
const debug = require('debug')('http:route-toy');

module.exports = function(router) {

  router.post('/api/toy', (req, res, next) => {
    debug('/api/toy POST');

    return storage.create(req.body)
      .then(toy => res.status(201).json(toy))
      .catch(err => next(err));
  });

  router.get('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy GET');

    return storage.fetchOne(req.params._id)
      .then(toy => res.json(toy))
      .catch(next);
  });

  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET');

    return storage.fetchAll()
      .then(ids => res.json(ids))
      .catch(next);
  });

  router.put('api/toy/:_id', (req, res, next) => {
    debug('/api/toy PUT');

    return storage.update(req.params._id, req.body)
      .then(() => res.sendStatus(204))
      .catch(next);
  });


  router.delete('/api/toy:_id', (req, res, next) => {
    debug('api/toy DELETE');

    return storage.destroy(req.params._id)
      .then(() => res.sendStatus(204))
      .catch(next);
  });
};
