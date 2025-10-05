import './css/App.css'
import Register from './pages/register';
import Login from './pages/Login';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ChangePassword from './pages/ChangePassword';
import Home from './pages/Home';
import Favorite from './pages/Favorites';
import MovieDetails from './pages/MovieDetails';
import { MovieProvider } from './contexts/MovieContext';
import Contact from './pages/contact';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Logout from './pages/Logout';
import WatchTrailer from './pages/WatchTrailer';
import MovieReviews from './pages/MovieReviews';
import WatchFullMovie from './pages/WatchFullMovie';



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
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
