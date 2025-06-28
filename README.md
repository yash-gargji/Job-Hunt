JobNestle - Full Stack Job Portal
![JobNestle](https://imgmg..shields.io/

JobNestle is a comprehensive full-stack job portal application designed to connect job seekers and recruiters efficiently. Built with modern web technologies, it provides a seamless experience for job posting, application tracking, and candidate management.

✨ Features
🔐 Authentication & Authorization
Secure user registration and login

Role-based access control (Job Seekers, Recruiters, Admin)

JWT-based authentication

Protected routes and middleware

👔 For Job Seekers
Browse and search job listings

Apply to jobs with one-click functionality

Save jobs for later viewing

Track application status (Pending, Accepted, Rejected)

Responsive job cards with company information

Personal dashboard with applied and saved jobs

🏢 For Recruiters
Post and manage job listings

View and manage job applicants

Update application status

Company profile management

Admin dashboard with analytics

📱 User Experience
Fully responsive design

Modern, clean UI with Tailwind CSS

Real-time notifications with toast messages

Loading states and error handling

Intuitive navigation and user flows

🛠️ Technologies Used
Frontend
React 18 - Modern component-based architecture

Redux Toolkit - State management

React Router - Client-side routing

Tailwind CSS - Utility-first styling

Lucide React - Modern icons

Axios - HTTP client

Backend
Node.js - Runtime environment

Express.js - Web framework

MongoDB - NoSQL database

Mongoose - ODM for MongoDB

JWT - Authentication tokens

Bcrypt - Password hashing

Development Tools
Vite - Fast build tool

ESLint - Code linting

Custom Hooks - Reusable logic

Git - Version control

📦 Installation
Prerequisites
Node.js (v18 or higher)

MongoDB

Git

Setup Instructions
Clone the repository

bash
git clone https://github.com/yash-gargji/JobNestle.git
cd JobNestle
Backend Setup

bash
cd backend
npm install
Frontend Setup

bash
cd ../frontend
npm install
Environment Variables
Create a .env file in the backend directory:
for local environment

📁 Project Structure
text
JobNestle/
├── frontend/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── redux/         # Redux store and slices
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   ├── public/
│   └── package.json
├── backend/
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── utils/            # Utility functions
│   └── package.json
└── README.md
🎯 Key Features Implementation
Job Management System
CRUD operations for job postings

Advanced search and filtering

Application tracking system

Status management (pending, accepted, rejected)

User Interface Components
Modern job cards with hover effects

Responsive tables for admin dashboards

Modal confirmations for critical actions

Toast notifications for user feedback

State Management
Redux store for global state

Custom hooks for API calls

Loading states and error handling

Optimistic UI updates

🔗 API Endpoints
Authentication
POST /api/v1/user/register - User registration

POST /api/v1/user/login - User login

POST /api/v1/user/logout - User logout

Jobs
GET /api/v1/job/get - Get all jobs

POST /api/v1/job/post - Create new job

GET /api/v1/job/get/:id - Get job by ID

PUT /api/v1/job/update/:id - Update job

DELETE /api/v1/job/delete/:id - Delete job

Applications
POST /api/v1/application/apply/:id - Apply to job

GET /api/v1/application/get - Get user applications

PUT /api/v1/application/status/:id/update - Update application status

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

📞 Contact
Yash Garg

GitHub: @yash-gargji

Email: yash.garg@example.com

🙏 Acknowledgments
React team for the amazing library

Tailwind CSS for the utility-first approach

MongoDB team for the flexible database

⭐ Star this repository if you found it helpful!