'use strict';

const debug = require('debug')('http:model-toy');
const mongoose = require('mongoose');

const Toy = mongoose.Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true},
}, {timestamps: true});
debug('#mongoose.Schema');

module.exports = mongoose.model('goose', Toy);
