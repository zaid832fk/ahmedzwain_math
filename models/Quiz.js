const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a quiz title"],
        trim: true
    },
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    questions: [{
        question: String,
        options: [String],
        correctAnswer: String,
        points: Number
    }],
    totalPoints: {
        type: Number,
        default: 100
    },
    timeLimit: {
        type: Number,
        default: 30
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Quiz", QuizSchema);