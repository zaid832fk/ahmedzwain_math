const bcrypt = require("bcrypt");
const User = require("./models/User");
require("./db");

async function seed() {
    const hashed = await bcrypt.hash("Alfapy2@", 10);

    await User.deleteMany({ role: "teacher" });

    await User.create({
        name: "Ahmed Zwain",
        email: "ahmedzwain@gmail.com",
        password: hashed,
        role: "teacher"
    });

    console.log("Teacher account created");
    process.exit();
}

seed();