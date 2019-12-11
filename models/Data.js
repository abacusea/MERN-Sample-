const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  name : { type: String, required: true },
  image : { type: String, required: true },
  description : { type: String, required: true },
  rating : { type: Number, required: true },
  price: {type: Number, required: true},
  seller : { type: String, required: true },
  manufacturer : { type: String, required: true },
  discount : { type: Number, required: true }
});

module.exports = Data = mongoose.model("data", DataSchema);