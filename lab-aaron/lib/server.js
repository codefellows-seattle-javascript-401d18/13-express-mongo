'use strict';

const debug = require('debug')('http:server');

// setting up express
const express = require('express');
const router = express.Router();
const app = express();
debug('shut up debug');

// setting up middleware
const bodyParser = require('body-parser').json();
const cors = require('./cors-middleware');
const errorMiddleWare = require('./error-middleware');

// routes
require('../route/route-toy')(router);

// mount middleware
app.use(bodyParser);
app.use(cors);
app.use(router);

// always last to catch errors
app.use(errorMiddleWare);

app.all('/*', (req, res) => res.sendStatus(404));

module.exports = app;
