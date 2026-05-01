# Team Task Manager

A full-stack web application allowing teams to manage projects, assign tasks, and track progress, featuring role-based access control (Admin and Member).

## Features

- **Authentication**: JWT-based Signup and Login with hashed passwords (bcrypt).
- **Role-Based Access Control (RBAC)**: 
  - **Admin**: Create projects, add tasks, delete tasks/projects.
  - **Member**: View assigned tasks, update task status (Pending, In Progress, Completed).
- **Dashboard**: Real-time overview of task counts, overdue highlights, and task distribution by status.
- **Project Management**: Admins can manage multiple projects.
- **Task Management**: Create tasks, assign them to projects, set due dates.

## Tech Stack

- **Frontend**: React.js (Vite), Tailwind CSS, React Router, Axios, Context API
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)
- **Authentication**: JSON Web Tokens (JWT)

## Setup Instructions

### Prerequisites
- Node.js (v16+)
- MongoDB connection string

### Environment Variables
You will need to set up a `.env` file in the `backend/` directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Installation

1. **Clone the repository** (if applicable) and navigate to the root directory.

2. **Install Backend Dependencies**:
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**:
   ```bash
   cd client
   npm install
   ```

4. **Run the Application**:
   Open two terminals.
   
   Terminal 1 (Backend):
   ```bash
   cd backend
   npm start
   # or node server.js
   ```

   Terminal 2 (Frontend):
   ```bash
   cd client
   npm run dev
   ```

## Deployment Steps (Railway/Render)

1. **Backend**: 
   - Deploy the `backend/` folder.
   - Set the `MONGO_URI`, `JWT_SECRET`, and `PORT` in the deployment environment settings.
   - Set the start command to `node server.js`.

2. **Frontend**:
   - Deploy the `client/` folder to Vercel, Netlify, or Railway.
   - Update the `API_URL` in `src/services/api.js` to point to the deployed backend URL instead of `http://localhost:5000/api`.

---
Developed as a complete student portfolio project.
