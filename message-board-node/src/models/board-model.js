'use strict';

const server = require('exp-server');
const mongoose = server.require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
  registerDate: { type: Date },
  title: { type: String },
  name: { type: String },
  text: { type: String },
  //filter
  deleted: { type: Boolean, default: false },
});

const Board = mongoose.model('BoardModel', BoardSchema, 'boards');
module.exports = Board;