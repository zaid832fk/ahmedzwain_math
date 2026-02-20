const mongoose = require("mongoose");

const lectureSchema = new mongoose.Schema({
    title: String,
    classId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    },
    videoUrl: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Lecture", lectureSchema);