<Route path="/movie/:id" element={<MovieDetails />} />
import './css/App.css'
import Home from './pages/Home.jsx';
import Favorite from './pages/Favorites.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
import { MovieProvider } from './contexts/MovieContext.jsx';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';


function App() {

  return (
    <MovieProvider>
      <NavBar />
      <main className='main-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorite />} />
          <Route path='/movie/:id' element={<MovieDetails />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
