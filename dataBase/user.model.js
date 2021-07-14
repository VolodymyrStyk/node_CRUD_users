const { Schema, model } = require('mongoose');

const { dataBaseTables, userRoles } = require('../constants');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 17,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(userRoles),
    default: userRoles.USER
  },
  activate: {
    type: Boolean,
    default: false
  },
  mailToken: {
    type: String
  },
  avatar: {
    type: String
  },
  avatars: {
    type: Array
  },
  documents: {
    type: String
  }
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });

userSchema.virtual('Name and email').get(() => `Name: ${this.name}; Email: ${this.email}`);

module.exports = model(dataBaseTables.USER, userSchema);
