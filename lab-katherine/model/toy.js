'use strict'

const debug = require('debug')('http:model-toy')
// const uuid = require('uuid/v4')
//
// module.exports = function(name, desc) {
//   debug(`model-toy: ${name} created`)
//   this.name = name
//   this.desc = desc
//   this._id = uuid()
// }

// will automatically create an id
const mongoose = require('mongoose')
const Toy = mongoose.Schema({
  //could use name: String
  name: {type: String, required: true, unique: true}
  desc: {type: String, required: true}
}, {timestamps: true})

module.exports = mongoose.model('toy', Toy)
