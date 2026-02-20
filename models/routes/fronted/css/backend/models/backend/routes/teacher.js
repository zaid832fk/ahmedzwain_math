const express = require("express");
const jwt = require("jsonwebtoken");
const Class = require("../models/Class");

const router = express.Router();

// ميدل وير تحقق أستاذ
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

// جلب كل الفصول
router.get("/classes", isTeacher, async (req, res) => {
    const classes = await Class.find();
    res.json(classes);
});

// إضافة فصل
router.post("/classes", isTeacher, async (req, res) => {
    const newClass = await Class.create({
        title: req.body.title
    });
    res.json(newClass);
});

// حذف فصل
router.delete("/classes/:id", isTeacher, async (req, res) => {
    await Class.findByIdAndDelete(req.params.id);
    res.json({ success: true });
});

module.exports = router;