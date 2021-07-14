const { Schema, model } = require('mongoose');

const { dataBaseTables, dataBaseMethod } = require('../constants');

const oAuthSchema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },

  refreshToken: {
    type: String,
    required: true
  },

  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: dataBaseTables.USER
  }

}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

oAuthSchema.pre(dataBaseMethod.FIND_ONE, function() {
  this.populate('user_id');
});

oAuthSchema.pre(dataBaseMethod.CREATE, function() {
  this.populate('user_id');
});

oAuthSchema.pre(dataBaseMethod.FIND_ONE_AND_DELETE, function() {
  this.populate('user_id');
});

module.exports = model(dataBaseTables.O_AUTH, oAuthSchema);
