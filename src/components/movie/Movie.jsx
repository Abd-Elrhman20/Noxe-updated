import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';


export default function Movie() {
    const [allMovies, setAllMovies] = useState(null)
    async function getTrendingMovies() {
        let { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=44f1f80237012774946ba3a2fbbce7a1')
        setAllMovies(data.results)
    }
    
    useEffect(() => {
        getTrendingMovies()
    }, [])



    return (
        <React.Fragment>

            {allMovies ? <div className="container">
                <div className="row mt-5 align-items-center">
                    <div className="col-md-4">
                        <div className="trending">
                            <div className="upper"></div>
                            <h5>Trending Movies to watch now</h5>
                            <p className='text-muted'>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                            <div className="lower"></div>
                        </div>
                    </div>

                    {allMovies ? allMovies.map(function (movie, index) {
                        return (
                            <div key={index} className="col-md-2">
                                <Link to={`/movieDetails/${movie.id}`}>
                                    <div className="movie">
                                        <img className='w-100' src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} style={{ cursor: "pointer" }} alt="movie image" />
                                        <p className='text-center mt-1'>{movie.title}</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    }) : ""}

                </div>
                
            </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>
                <i className='fa-spinner fa-solid fa-spin fa-5x text-white'></i>
            </div>}

        </React.Fragment >
    )
}
