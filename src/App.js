
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import MovieDetails from './pages/MovieDetails'
import {AuthContext} from './context/AuthContext'
import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userObserver } from './firebase';
import { MovieContext } from './context/MoviesContext';

function App() {

  const [currentUser, setCurrentUser] = useState();
  const [movies, setMovies] = useState([]);
  useEffect(() => { 
    userObserver(setCurrentUser)
  }, [])

  return (
		<AuthContext.Provider value={{ currentUser }}>
      <MovieContext.Provider value={ {movies, setMovies} }>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/details/:id" element={<MovieDetails />} />
				</Routes>
			</MovieContext.Provider>
		</AuthContext.Provider>
	);
}

export default App;
