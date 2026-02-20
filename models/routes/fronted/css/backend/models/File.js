const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
    title: String,
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    fileUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("File", fileSchema);