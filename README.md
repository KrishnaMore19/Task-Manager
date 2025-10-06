# Task Manager Application

A simple Task Manager app built with MERN stack where users can create, update, delete, and manage their tasks.

## 🚀 Tech Stack

**Frontend:** React.js (Vite), Tailwind CSS, Framer Motion  
**Backend:** Node.js, Express.js, MongoDB  
**Authentication:** JWT (JSON Web Tokens)

## ✨ Features

- User authentication (Sign up, Login, Logout)
- Create, read, update, and delete tasks
- Mark tasks as complete/incomplete
- Filter tasks by status
- Search tasks by title
- Set task deadlines and priorities
- Responsive design with smooth animations
- About, Contact, and Privacy etc pages (UI only - redirect to 404)

## 📋 Prerequisites

- Node.js installed on your computer
- MongoDB installed locally OR MongoDB Atlas account

## 🛠️ How to Run the Project Locally

### Step 1: Clone the Project
```bash
git clone <your-repository-url>
cd Task-Manager
```

### Step 2: Setup Backend

1. Go to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend folder and add:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodburl
JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
API_VERSION=v1
```

4. Start the backend server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 3: Setup Frontend

1. Open a new terminal and go to the frontend folder:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend folder and add:
```env
# Backend API URL
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Task Manager
VITE_APP_VERSION=1.0.0

# Features Toggle (Optional)
VITE_ENABLE_ANIMATIONS=true
VITE_ENABLE_DARK_MODE=false
```

4. Start the frontend:
```bash
npm run dev
```

Frontend will run on `http://localhost:5173`

### Step 4: Use the App

1. Open your browser and go to `http://localhost:5173`
2. Sign up with your email and password
3. Login and start creating tasks!

## 📝 Notes

- Make sure MongoDB is running before starting the backend
- Both backend and frontend must be running at the same time
- The backend server must start before the frontend can connect to it


Built for AdihaOne Full Stack Intern Interview Project
