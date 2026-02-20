const express = require("express");
const multer = require("multer");
const jwt = require("jsonwebtoken");
const File = require("../models/File");

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

// رفع ملف PDF
router.post("/upload", isTeacher, upload.single("file"), async (req, res) => {
    const { title, classId } = req.body;
    const fileUrl = req.file.path;

    const newFile = await File.create({ title, classId, fileUrl });
    res.json(newFile);
});

// جلب الملفات حسب الفصل
router.get("/class/:id", isTeacher, async (req, res) => {
    const files = await File.find({ classId: req.params.id });
    res.json(files);
});

module.exports = router;