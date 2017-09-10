'use strict';

const debug = require('debug')('http:model-toy');
const mongoose = require('mongoose');

const Toy = mongoose.Schema({
  name: {type: String, require: true},
  desc: {type: String, require:true},
}, {timestamps: true});
debug('#Toy model');

module.exports = mongoose.model('toy', Toy);
