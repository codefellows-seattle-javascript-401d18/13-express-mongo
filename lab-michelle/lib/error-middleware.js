//Need to check through all this
'use strict';

// const createError = require('http-errors');
const debug = require('debug')('http:error-middleware');

module.exports = function(err, req, res) {
  let msg = err.message.toLowerCase();
  console.log(msg);
  switch(true) {
    case msg.includes('validation failed'): return res.status(400).send(`${err.name}: ${err.message}`);
    case msg.includes('duplicate key'): return res.status(409).send(`${err.name}: ${err.message}`);
    case msg.includes('objectid failed'): return res.status(404).send(`${err.name}: ${err.message}`);
    default: return res.status(500).send(`${err.name}: ${err.message}`)
  }

  // debug('user error');
  // if (err.status) {
  //   res.status(err.status).send(err.name);
  //   next();
  //   return;
  // }
  //
  // debug('server error');
  // err = createError(500, err.message);
  // res.status(err.status).send(err.name);
  // next();
  //implicit return
};
