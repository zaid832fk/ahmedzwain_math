const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mathPlatform", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Database Connected Successfully");
    } catch (err) {
        console.error("❌ Database Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = connectDB;