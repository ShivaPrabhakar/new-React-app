const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    _user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    _target: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    // author_name: String,
    message: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        default: Date.now
    }
});
messageSchema.set('toObject', { virtuals: true });
module.exports = mongoose.model('Message', messageSchema);