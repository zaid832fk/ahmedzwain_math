const express = require("express");
const cors = require("cors");
require("./db");

const authRoutes = require("./routes/auth");
const teacherRoutes = require("./routes/teacher");
const lectureRoutes = require("./routes/lecture");
const fileRoutes = require("./routes/file");
const messageRoutes = require("./routes/message");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/teacher", teacherRoutes);
app.use("/api/file", fileRoutes);
app.use("/api/lecture", lectureRoutes);
app.use('/uploads', express.static('uploads')); // لتصفح الفيديوهات
app.use("/api/message", messageRoutes);

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
