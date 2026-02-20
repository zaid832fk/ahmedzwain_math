const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    from: String,       // البريد الإلكتروني المرسل
    to: String,         // البريد الإلكتروني المستقبل
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Message", messageSchema);