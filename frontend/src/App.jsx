<Route path="/movie/:id" element={<MovieDetails />} />
import './css/App.css'
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Favorite from './pages/Favorites.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import { MovieProvider } from './contexts/MovieContext.jsx';
import Contact from './pages/contact.jsx';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';


function App() {

  return (
    <MovieProvider>
      <NavBar />
      <main className='main-container'>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorite />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
