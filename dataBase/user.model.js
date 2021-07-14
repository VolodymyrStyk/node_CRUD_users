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
  isEmailActive: {
    type: Boolean,
    default: false
  },
  isDelete: {
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

userSchema.virtual('Name and Email').get(function() {
  return `Name:${this.name}; Email:${this.email}`;
});

module.exports = model(dataBaseTables.USER, userSchema);
