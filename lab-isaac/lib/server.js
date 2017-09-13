'use strict';

const debug = require('debug')('http:server');

// express setup
// const PORT = process.env.PORT || 3000;
const express = require('express');
const router = express.Router();
const app = express();

// mongoose setup
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/toy-dev';
mongoose.Promise = require('bluebird');
mongoose.connect(MONGODB_URI, {useMongoClient: true});

// middleware
const bodyParser = require('body-parser').json();
const cors = require('./cors');
const errorMiddleware = require('./error-middleware');

// routes
require('../route/route-toy')(router);
// require('../route/route-kid')(router);
// require('../route/route-family')(router);

// mount middleware
debug('bodyParser');
app.use(bodyParser);
debug('cors');
app.use(cors);
debug('router');
app.use(router);
//this should be the last to catch errors with the callback chain
debug('errorMiddleware');
app.use(errorMiddleware);
debug('app.all');
app.all('/*', (req, res) => res.sendStatus(404));


module.exports = app;
