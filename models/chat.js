const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema([{
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true,
        maxLength: 50
    },
    created_at: {
        type: Date,
        required: true
    }
}]);

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;