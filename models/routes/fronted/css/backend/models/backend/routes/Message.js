const express = require("express");
const jwt = require("jsonwebtoken");
const Message = require("../models/Message");

const router = express.Router();

// حماية المستخدم
function isAuth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.sendStatus(403);
    try {
        jwt.verify(token, "SECRET_KEY");
        next();
    } catch {
        res.sendStatus(403);
    }
}

// إرسال رسالة
router.post("/send", isAuth, async (req, res) => {
    const { from, to, content } = req.body;
    const msg = await Message.create({ from, to, content });
    res.json(msg);
});

// جلب الرسائل بين شخصين
router.post("/fetch", isAuth, async (req, res) => {
    const { user1, user2 } = req.body;
    const messages = await Message.find({
        $or: [
            { from: user1, to: user2 },
            { from: user2, to: user1 }
        ]
    }).sort({ createdAt: 1 });
    res.json(messages);
});

module.exports = router;