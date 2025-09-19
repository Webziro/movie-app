import './css/App.css'
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ResetPassword from './pages/ResetPassword.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import Home from './pages/Home.jsx';
import Favorite from './pages/Favorites.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import { MovieProvider } from './contexts/MovieContext.jsx';
import Contact from './pages/contact.jsx';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Logout from './pages/Logout.jsx';



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
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
