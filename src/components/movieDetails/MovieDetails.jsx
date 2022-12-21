import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function MovieDetails() {

    let myObject = useParams()

    const [movieObject, setMovieObject] = useState({})
    async function getMovieDetails() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/movie/${myObject.id}?api_key=44f1f80237012774946ba3a2fbbce7a1`)
        setMovieObject(data)
        // console.log(data);
    }

    useEffect(() => {
        getMovieDetails()
    }, [])


    return (
        <React.Fragment>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-4">
                        <img className='w-100' src={`https://image.tmdb.org/t/p/original/${movieObject.poster_path}`} alt="" />
                    </div>
                    <div className="col-md-8">
                        <h3>{movieObject.original_title}</h3>
                        <p className='mt-3 mb-4'>{movieObject.overview}</p>

                        {movieObject.genres?.map((genre, index) => <span key={index} className='me-2 p-2 bg-info text-white'>
                            {genre.name}
                        </span>)}

                        <p className='mt-4 text-muted'>Vote : {movieObject.vote_average}</p>
                        <p className='mt-3 text-muted'>vote_count : {movieObject.vote_count}</p>
                        <p className='mt-3 text-muted'>popularity : {movieObject.popularity}</p>
                        <p className='mt-3 text-muted'>release_date : {movieObject.release_date}</p>
                        <p className='mt-3 text-muted'>{movieObject.tagline}</p>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
