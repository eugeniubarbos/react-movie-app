import React, { useEffect,useContext } from 'react';
import axios from 'axios';
import MovieCard from '../components/MovieCard/MovieCard';
import { MovieContext } from '../context/MoviesContext';

const baseUrl = 'https://api.themoviedb.org/3';
const moviesUrl = `${baseUrl}/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;

const Home = () => {

  const { movies, setMovies}= useContext(MovieContext)
  useEffect(() => { 
    fetchMovies(moviesUrl);
  }, [])

  const fetchMovies = async(url) => { 
    const res = await axios.get(url);
    setMovies(res.data.results)
  }



  return (
    <div className='d-flex justify-content-center flex-wrap page' style={ {background:'#555'} }>

      { movies.map(movie => <MovieCard key={ movie.id } movie={ movie} />)}
    </div>
  )
}

export default Home