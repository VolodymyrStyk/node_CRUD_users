const mongoose = require('mongoose');

module.exports = (userId) => (mongoose.Types.ObjectId.isValid(userId));
