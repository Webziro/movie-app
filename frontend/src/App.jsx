
import './css/App.css'
import Home from './pages/Home.jsx';
import Favorite from './pages/Favorites.jsx';
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
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
