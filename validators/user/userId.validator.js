const mongoose = require('mongoose');

module.exports.checkIsIdValid = (userId) => (mongoose.Types.ObjectId.isValid(userId));
