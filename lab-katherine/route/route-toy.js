'use strict'

const Toy = require('../model/toy')
const debug = require('debug')('http:route-toy')


module.exports = function(router) {
  router.post('/api/toy', (req, res, next) => {
    debug('/api/toy POST')

    //remember to explicitly save
    return new Toy(req.body).save()
      .then(toy => res.status(201).json(toy))
      .catch(next)
  })

  // This is how express allows dynamic routes via parameters
  // http GET :3000/api/toy/1234-5678
  // req.params._id => 1234-5678

  // This is how our vanilla http servers were structured
  // http GET :3000/api/toy?_id=1234-5678
  // req.query._id => 1234-5678

  // superagent request:
  // superagent.get(':3000/api/toy/1234-5678')
  // .then(...)
  // .catch(...)

  router.get('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy/:_id GET')

    return Toy.findById(req.params._id)
      .then(toy => res.json(toy))
      //will throw 500 error instead of 404
      .catch(next)
  })

  router.get('/api/toy', (req, res, next) => {
    debug('/api/toy GET')
    // return storage.fetchAll()
    //   .then(id => res.json(ids))
    //   .catch(next)
  })

  router.put('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy PUT')
    // return storage.update(req.body, req.params._id)
    //   .then(() => res.status(204))
    //   .catch(next)
  })

  router.delete('/api/toy/:_id', (req, res, next) => {
    debug('/api/toy DELETE')
    // return storage.destroy(req.params._id)
    //   .then(() => res.sendStatus(204))
    //   .catch(next)
  })
}
