# 🎬 React Movie App

A full-stack movie discovery application built with React, Node.js, and MongoDB. Users can browse movies, watch trailers, read reviews, get recommendations, and manage their favorite movies.

## ✨ Features

### 🎯 Core Features
- **Movie Discovery**: Browse popular and top-rated movies from The Movie Database (TMDB)
- **Movie Details**: View comprehensive movie information, ratings, and descriptions
- **Trailer Integration**: Watch official movie trailers via YouTube integration
- **Movie Reviews**: Read user reviews and ratings for movies
- **Smart Recommendations**: Get personalized movie recommendations based on your interests
- **Favorites System**: Save and manage your favorite movies with local storage
- **Search Functionality**: Search for movies by title

### 🔐 Authentication & Security
- **User Registration & Login**: Secure user authentication with JWT tokens
- **Password Reset**: Email-based password recovery system
- **Protected Routes**: Secure access to user-specific features
- **Session Management**: Persistent login state with localStorage

### 🎨 User Experience
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Loading States**: User-friendly loading indicators
- **Error Handling**: Graceful error handling with user feedback
- **Navigation**: Intuitive navigation with breadcrumbs and back buttons

## 🏗️ Architecture

### Frontend (React)
- **Framework**: React 19 with Vite for fast development
- **Routing**: React Router DOM for client-side navigation
- **State Management**: React Context API for global state
- **Styling**: Custom CSS with responsive design
- **API Integration**: TMDB API for movie data

### Backend (Node.js)
- **Framework**: Express.js server
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Email Service**: Nodemailer for password reset emails
- **Security**: bcryptjs for password hashing

### Deployment
- **Frontend**: Netlify for static site hosting
- **Backend**: Netlify Functions for serverless API
- **Database**: MongoDB Atlas (cloud database)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Webziro/movie-app.git
   cd movie-app
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Install Netlify Functions Dependencies**
   ```bash
   cd ../netlify/functions
   npm install
   ```

### Environment Setup

#### Backend Environment Variables
Create a `.env` file in the `backend` directory:

```env
# JWT Secret for token generation
JWT_SECRET=your-super-secret-jwt-key-here

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/movie_db
```

#### Frontend Environment Variables
Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_TMDB_API_KEY=your-tmdb-api-key
```

### Email Setup (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `EMAIL_PASS` (not your regular Gmail password)

### TMDB API Setup

1. Visit [The Movie Database](https://www.themoviedb.org/)
2. Create an account and request an API key
3. Add your API key to the frontend environment variables

## 🏃‍♂️ Running the Application

### Development Mode

1. **Start the Backend Server**
   ```bash
   cd backend
   npm run dev
   ```
   Server runs on `http://localhost:3000`

2. **Start the Frontend Development Server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

3. **Access the Application**
   - Open your browser and navigate to `http://localhost:5173`
   - Register a new account or login with existing credentials

### Production Build

1. **Build the Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `cd netlify/functions && npm install && cd ../../frontend && npm install && npm run build`
   - Set publish directory: `frontend/dist`

## 📁 Project Structure

```
movie-app/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React Context providers
│   │   ├── services/       # API service functions
│   │   ├── css/           # Stylesheets
│   │   └── assets/        # Static assets
│   ├── public/            # Public assets
│   └── dist/              # Production build output
├── backend/               # Node.js backend server
│   ├── api/              # API documentation
│   └── server.js         # Main server file
├── netlify/
│   └── functions/        # Netlify serverless functions
├── netlify.toml          # Netlify configuration
└── README.md            # This file
```

## 🔧 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `POST /api/forgot-password` - Request password reset
- `POST /api/reset-password` - Reset password with token

### User Management
- `GET /api/user` - Get user profile
- `PUT /api/change-password` - Change user password

### Contact
- `POST /api/contact` - Send contact message

## 🎨 Key Components

### Frontend Components
- **MovieCard**: Displays movie information with action buttons
- **NavBar**: Navigation header with authentication state
- **MovieDetails**: Detailed movie view with recommendations
- **MovieRecommendations**: Personalized movie suggestions
- **MovieReviews**: User reviews and ratings display

### Pages
- **Home**: Movie discovery dashboard
- **Login/Register**: Authentication pages
- **MovieDetails**: Individual movie information
- **Favorites**: User's saved movies
- **Contact**: Contact form

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **Protected Routes**: Authentication required for sensitive features
- **Email Verification**: Secure password reset via email
- **Input Validation**: Server-side input validation and sanitization

## 🚀 Deployment

### Netlify Deployment
1. Connect your GitHub repository to Netlify
2. Configure build settings in `netlify.toml`
3. Set environment variables in Netlify dashboard
4. Deploy automatically on git push

### Environment Variables for Production
```env
# Backend
JWT_SECRET=your-production-jwt-secret
EMAIL_USER=your-production-email
EMAIL_PASS=your-production-email-password
MONGODB_URI=your-production-mongodb-uri

# Frontend
VITE_API_URL=your-netlify-functions-url
VITE_TMDB_API_KEY=your-tmdb-api-key
```

## 🛠️ Technologies Used

### Frontend
- **React 19** - UI framework
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and development server
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - Email service

### Deployment
- **Netlify** - Frontend hosting and serverless functions
- **MongoDB Atlas** - Cloud database
- **GitHub** - Version control and CI/CD

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Webziro** - *Initial work* - [GitHub](https://github.com/Webziro)

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for movie data
- [React](https://reactjs.org/) for the amazing frontend framework
- [Netlify](https://netlify.com/) for hosting and serverless functions
- [MongoDB](https://www.mongodb.com/) for the database solution

## 📞 Support

If you have any questions or need help with the project, please:
- Open an issue on GitHub
- Contact us through the contact form in the application
- Check the documentation in the `backend/api/` directory

---

**Happy Movie Watching! 🍿**
