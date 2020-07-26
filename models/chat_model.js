const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


const chatSchema = new mongoose.Schema({
    users: {
        type: [ mongoose.Schema.Types.ObjectId],
        required: true,
        default: []
    },
    requested_by:  mongoose.Schema.Types.ObjectId,
    accepted: {
        type: Boolean,
        default: false,
    },
    rejected: {
        type: Boolean,
        default: false,
    },
    created_on: {
        type: Date,
        default: Date.now,
    }
});
chatSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Chat', chatSchema);