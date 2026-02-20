const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const Lecture = require("../models/Lecture");

const router = express.Router();

// حماية الأستاذ
function isTeacher(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(403);
    try {
        const decoded = jwt.verify(token, "SECRET_KEY");
        if (decoded.role !== "teacher") return res.sendStatus(403);
        next();
    } catch {
        res.sendStatus(403);
    }
}

// إعداد multer للرفع
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
const upload = multer({ storage });

// رفع فيديو جديد
router.post("/upload", isTeacher, upload.single("video"), async (req, res) => {
    const { title, classId } = req.body;
    const videoUrl = req.file.path;

    const lecture = await Lecture.create({ title, classId, videoUrl });
    res.json(lecture);
});

// جلب الفيديوهات حسب الفصل
router.get("/class/:id", isTeacher, async (req, res) => {
    const lectures = await Lecture.find({ classId: req.params.id });
    res.json(lectures);
});

module.exports = router;