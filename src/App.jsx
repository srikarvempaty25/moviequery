import React, { useState, useEffect } from 'react';
import MovieCard from './MovieCard';

import "./App.css";

const API_URL = 'http://www.omdbapi.com/?apikey=688c0ae4';

const App = () => {

    const [ movies, setMovies ] = useState([]);
    const [ searchTerm, setSearchTerm ] = useState('');

    const searchMovie = async (title) => {
        try {
            const response = await fetch(`${API_URL}&s=${title}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setMovies(data.Search);
        } catch (error) {
            console.error("Error fetching the movie data:", error);
        }
    }

    useEffect(() => {
        searchMovie('StarWars');
    }, []);

    return (
        <div className="app">
            <h1>MOVIEQUERY</h1>
            <div className="search">
                <input 
                    placeholder="search for movies"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}/>
                <img 
                    src="https://raw.githubusercontent.com/gist/adrianhajdin/997a8cdf94234e889fa47be89a4759f1/raw/f13e5a9a0d1e299696aa4a0fe3a0026fa2a387f7/search.svg"
                    alt="search"
                    onClick={() => searchMovie(searchTerm)}
                />

            </div>

            {
                movies?.length > 0 
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie={movie} />
                        ))}
                    </div>
                )
                : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )
            }   
        </div>
    );
}

export default App;
