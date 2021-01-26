var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TableSchema = new Schema(
  {
    number: {type: Number, required: true},
    booked: {type: Boolean, required: true},
    dataBooked: {type: Date, required: true}
  }
);

// Virtual for book's URL
TableSchema
.virtual('url')
.get(function () {
  return '/cafe/tables/' + this._id;
});

//Export model
module.exports = mongoose.model('Table', TableSchema);