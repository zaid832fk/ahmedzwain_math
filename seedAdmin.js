require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./db");
const User = require("./models/User");

const seedAdmin = async () => {
    try {
        await connectDB();

        // Check if admin already exists
        const adminExists = await User.findOne({ email: "admin@mathplatform.com" });
        
        if (adminExists) {
            console.log("✅ Admin user already exists");
            process.exit(0);
        }

        // Create admin user
        const admin = new User({
            name: "Admin User",
            email: "admin@mathplatform.com",
            password: "admin123",
            role: "admin"
        });

        await admin.save();
        console.log("✅ Admin user created successfully!");
        console.log("Email: admin@mathplatform.com");
        console.log("Password: admin123");
        console.log("⚠️  Change this password immediately in production!");

        process.exit(0);
    } catch (err) {
        console.error("❌ Error seeding database:", err.message);
        process.exit(1);
    }
};

seedAdmin();