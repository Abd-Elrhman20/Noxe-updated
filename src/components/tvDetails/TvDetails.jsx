import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

export default function TvDetails() {

    let myObject = useParams()

    const [tvObject, setTvObject] = useState({})
    async function getTvDetails() {
        let { data } = await axios.get(`https://api.themoviedb.org/3/tv/${myObject.id}?api_key=44f1f80237012774946ba3a2fbbce7a1`)
        setTvObject(data)
        // console.log(data);
    }

    useEffect(() => {
        getTvDetails()
    }, [])

    return (
        <React.Fragment>
            <div className="container">
                <div className="row mt-4">
                    <div className="col-md-4">
                        <img className='w-100' src={`https://image.tmdb.org/t/p/original/${tvObject.poster_path}`} alt="" />
                    </div>
                    <div className="col-md-8">
                        <h3>{tvObject.original_title}</h3>
                        <p className='mt-3 mb-4'>{tvObject.overview}</p>

                        {tvObject.genres?.map((genre, index) => <span key={index} className='me-2 p-2 bg-info text-white'>
                            {genre.name}
                        </span>)}

                        <p className='mt-4 text-muted'>Vote : {tvObject.vote_average}</p>
                        <p className='mt-3 text-muted'>vote_count : {tvObject.vote_count}</p>
                        <p className='mt-3 text-muted'>popularity : {tvObject.popularity}</p>
                        <p className='mt-3 text-muted'>release_date : {tvObject.release_date}</p>
                        <p className='mt-3 text-muted'>{tvObject.tagline}</p>

                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
