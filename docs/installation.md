# Installation Guide

This guide will help you set up the MediSchedule application on your local development environment.

## Prerequisites

Before starting, ensure you have the following installed:

### Required Software

1. **Node.js** (v16 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **MongoDB** (v4.4 or higher)
   - **Option 1**: Local installation from [mongodb.com](https://www.mongodb.com/try/download/community)
   - **Option 2**: Use MongoDB Atlas (cloud database)
   - Verify installation: `mongod --version`

4. **Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

### Optional Software

- **MongoDB Compass** (GUI for MongoDB)
- **Postman** (API testing)
- **VS Code** (recommended code editor)

## Project Setup

### 1. Clone the Repository

```bash
# Clone the repository
git clone https://github.com/ismaeilalrewany/medi-schedule.git

# Navigate to project directory
cd medi-schedule
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# Use your preferred text editor
nano .env
```

#### Backend Environment Configuration

Edit the `.env` file with your actual values:

```bash
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/medischedule

# JWT Configuration (generate strong random strings)
JWT_SECRET=your-super-secret-jwt-key-here-minimum-32-characters
JWT_EXPIRES_IN=7d

# Cookie Configuration
COOKIE_SECRET=your-cookie-secret-key-here-minimum-32-characters

# Server Configuration
PORT=3000
NODE_ENV=development
USE_HTTPS=false

# Frontend URL
FRONTEND_URL=http://localhost:5173

# reCAPTCHA Configuration
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key-here
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file
nano .env
```

#### Frontend Environment Configuration

Edit the `.env` file:

```bash
# API Configuration
VITE_API_URL=http://localhost:3000

# reCAPTCHA Configuration
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key-here

# Application Configuration
VITE_APP_NAME=MediSchedule
```

### 4. Database Setup

#### Option 1: Local MongoDB

```bash
# Start MongoDB service
# On Windows:
net start MongoDB

# On macOS:
brew services start mongodb-community

# On Linux:
sudo systemctl start mongod

# Create database (optional - will be created automatically)
mongosh
use medischedule
```

#### Option 2: MongoDB Atlas

1. Create account at [mongodb.com](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env` file

### 5. reCAPTCHA Setup

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Create a new site
3. Choose reCAPTCHA v2 "I'm not a robot" Checkbox
4. Add domains:
   - `localhost` (for development)
   - Your production domain
5. Get site key and secret key
6. Update environment variables:
   - `VITE_RECAPTCHA_SITE_KEY` in frontend `.env`
   - `RECAPTCHA_SECRET_KEY` in backend `.env`

## Running the Application

### Development Mode

#### Start Backend Server

```bash
# From backend directory
cd backend
npm run dev

# Server will start on http://localhost:3000
```

#### Start Frontend Development Server

```bash
# From frontend directory (new terminal)
cd frontend
npm run dev

# Frontend will start on http://localhost:5173
```

### Production Mode

#### Build Frontend

```bash
# From frontend directory
npm run build

# Creates optimized build in dist/ directory
```

#### Run Backend in Production

```bash
# From backend directory
npm start

# Make sure to set NODE_ENV=production in .env
```

## Verification

### Check if Everything Works

1. **Backend Health Check**
   - Visit: `http://localhost:3000/api/check-server`
   - Should return: `{"message": "Server is running"}`

2. **Frontend Application**
   - Visit: `http://localhost:5173`
   - Should display the MediSchedule homepage

3. **Database Connection**
   - Check backend console for "Connected to MongoDB" message
   - No database connection errors

4. **reCAPTCHA Integration**
   - Try to register or login
   - reCAPTCHA widget should appear

## Troubleshooting

### Common Issues

#### Backend Issues

**Problem**: `MongoDB connection error`
```bash
# Solution: Check if MongoDB is running
# Windows:
net start MongoDB

# macOS:
brew services start mongodb-community

# Linux:
sudo systemctl start mongod
```

**Problem**: `JWT_SECRET not found`
```bash
# Solution: Check .env file exists and has JWT_SECRET
ls -la .env
cat .env | grep JWT_SECRET
```

**Problem**: `Port 3000 already in use`
```bash
# Solution: Change PORT in .env or kill process
# Find process using port 3000
lsof -i :3000
# Kill process
kill -9 <PID>
```

#### Frontend Issues

**Problem**: `VITE_API_URL not accessible`
```bash
# Solution: Check if backend is running
curl http://localhost:3000/api/check-server
```

**Problem**: `reCAPTCHA not loading`
```bash
# Solution: Check reCAPTCHA site key
# Make sure VITE_RECAPTCHA_SITE_KEY is set
# Check browser console for errors
```

**Problem**: `Module not found errors`
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

#### CORS Issues

**Problem**: `CORS error in browser`
```bash
# Solution: Check FRONTEND_URL in backend .env
# Make sure it matches your frontend URL
FRONTEND_URL=http://localhost:5173
```

### Debug Mode

Enable additional logging:

```bash
# Backend debug mode
DEBUG=* npm run dev

# Frontend with detailed errors
npm run dev -- --debug
```

## Database Seeding (Optional)

Create sample data for testing:

```bash
# From backend directory
node scripts/seed.js
```

This will create:
- Sample admin user
- Sample doctors
- Sample patients
- Sample appointments

## Next Steps

1. **Create Admin User**: Register the first admin user
2. **Test Registration**: Try registering patients and doctors
3. **Book Appointments**: Test the appointment booking system
4. **Explore Features**: Navigate through all application features

## Development Tools

### Recommended VS Code Extensions

- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- MongoDB for VS Code
- Thunder Client (API testing)

### Useful Commands

```bash
# Backend
npm run dev      # Development server
npm start        # Production server
npm run lint     # Run linting
npm test         # Run tests (if available)

# Frontend
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run linting
```

## Production Deployment

For production deployment, see:
- [Backend Deployment Guide](deployment-backend.md)
- [Frontend Deployment Guide](deployment-frontend.md)

## Getting Help

If you encounter issues:

1. Check the troubleshooting section above
2. Review the error messages carefully
3. Check the GitHub issues
4. Contact the developer: [ismailalrewany332@gmail.com](mailto:ismailalrewany332@gmail.com)

---

*This installation guide covers the basic setup. For advanced configuration and deployment, refer to the respective documentation files.*
