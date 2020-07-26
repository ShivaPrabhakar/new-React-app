const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    room_id: mongoose.Schema.Types.ObjectId,
    author_id: mongoose.Schema.Types.ObjectId,
    author_name: String,
    message: String,
    time: {
        type: Date,
        default: Date.now
    }
});
messageSchema.set('toObject', { virtuals: true });
module.exports = mongoose.model('Message', messageSchema);