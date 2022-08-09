import React, { useContext, useState } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';
import { logout } from '../firebase';
import { MovieContext } from "../context/MoviesContext";
import axios from 'axios';

const baseUrl = "https://api.themoviedb.org/3";
const searchUrl = `${baseUrl}/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&query=`;
const Navbar = () => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext);
  const { setMovies } = useContext(MovieContext);
  const [search, setSearch] = useState('')


  const logoutHandler = () => { 
    logout();
    navigate('/login');
  }

  const searchHandler = async () => { 
    try {
      console.log(`${searchUrl}${search}`);
      const res = await axios.get(`${searchUrl}${search}`)
      setMovies(res.data.results);

    } catch (err) { 
      console.log(err)
    }
  }

  return (
    <nav className='navbar navbar-expand-lg fixed-top navbar-dark' style={ {backgroundColor: '#070707'} }>
      <div className='container-fluid'>
        <Link to="/" className='navbar-brand'><h4 className='text-danger'> React Movie App </h4></Link>
        <div className="d-flex align-items-center">
          { currentUser ? (
            <>
             <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search"
                  onChange={ (e) => setSearch(e.target.value) } value={ search} />
                <button className="btn btn-outline-success" type="button" onClick={ searchHandler}>Search</button>
              </form>
              <h4 className="text-capitalize d-inline-block text-warning mx-2">{ currentUser?.displayName }</h4>
              <button type="button" className="ms-2 btn btn-outline-light" onClick={ logoutHandler}> Logout</button>
            </>
          ): (
              <>
                <button type="button" className="ms-2 btn btn-outline-light"
                  onClick={ () => navigate('/login') }> Login</button>
                <button type="button" className="ms-2 btn btn-outline-light"
                  onClick={ () => navigate('/register') }
                > Register</button>
              </>
          ) }
        </div>
      </div>
   </nav>
  )
}

export default Navbar