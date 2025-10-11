import './css/App.css'
import Register from './pages/register.jsx';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import Favorite from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';
import { MovieProvider } from './contexts/MovieContext';
import Contact from './pages/Contact';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './contexts/AuthContext';
import NavBar from './components/NavBar';
import Logout from './pages/Logout';
import WatchTrailer from './pages/WatchTrailer';
import MovieReviews from './pages/MovieReviews';
import WatchFullMovie from './pages/WatchFullMovie';
import MovieRecommendations from './pages/MovieRecommendations';



function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  const location = useLocation();
  const hasToken = Boolean(token || localStorage.getItem('authToken'));
  if (!hasToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}

function App() {

  return (
    <MovieProvider>
      <NavBar />
      <main className='main-container'>
        <Routes>
          <Route path='/' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/change-password' element={<ChangePassword />} />
          <Route path='/home' element={<Home />} />
          <Route path='/favorites' element={<Favorite />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/watch-trailer/:id' element={<WatchTrailer/>}/>
          <Route path='/movie-reviews/:id' element={<MovieReviews/>}/>
          <Route path='/full-movies' element={<WatchFullMovie/>}/>
          <Route path='/movie-recommendations/:id' element={
            <ProtectedRoute>
              <MovieRecommendations/>
            </ProtectedRoute>
          }/>
          {/* Fallback: if no id is provided, redirect to login */}
          <Route path='/movie-recommendations' element={<Navigate to='/login' replace />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
