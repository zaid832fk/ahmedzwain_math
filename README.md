# 📚 Math Learning Platform

A comprehensive platform for learning mathematics with courses, quizzes, and interactive content.

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/zaid832fk/ahmedzwain_math.git
cd ahmedzwain_math
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/mathPlatform
JWT_SECRET=your_secret_key
NODE_ENV=development
```

5. Start MongoDB:
```bash
mongod
```

6. Seed admin user:
```bash
npm run seed
```

7. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## 📁 Project Structure

```
.
├── db.js              # Database connection
├── server.js          # Express server setup
├── seedAdmin.js       # Initialize admin user
├── package.json       # Dependencies
├── .env              # Environment variables
├── .gitignore        # Git ignore rules
└── models/           # Database models
    ├── User.js       # User schema
    ├── Course.js     # Course schema
    └── Quiz.js       # Quiz schema
```

## 🔑 Features

- ✅ User authentication (Student, Teacher, Admin)
- ✅ Course management
- ✅ Quiz system with multiple questions
- ✅ Password hashing with bcrypt
- ✅ JWT authentication ready
- ✅ CORS enabled
- ✅ Error handling

## 📝 Default Admin Credentials

- **Email**: admin@mathplatform.com
- **Password**: admin123

⚠️ **Change these immediately in production!**

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt
- JWT
- CORS

## 📄 License

ISC