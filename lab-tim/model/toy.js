'use strict';

//const debug = require('debug')('http:model-toy');
const mongoose = require('mongoose');

// module.exports = function(name, desc) {
//   debug(`model-toy: ${name} created`);
//   this.name = name;
//   this.desc = desc;
//   this._id = uuid();
// };

const Toy = mongoose.Schema({
  name: {type: String, required: true},
  desc: {type: String, required: true}
}, {timestamps: true});

module.exports = mongoose.model('toy', Toy);
