import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom';


export default function Home() {
    const [allMovies, setAllMovies] = useState(null)
    const [MoiveData, setMoiveData] = useState(null)
    async function getTrendingMovies() {
        let { data } = await axios.get('https://api.themoviedb.org/3/trending/movie/week?api_key=44f1f80237012774946ba3a2fbbce7a1')
        setAllMovies(data.results)
        setMoiveData(data)
    }

    const [allTv, setAllTv] = useState(null)
    const [TvData, setTvData] = useState(null)
    async function getTrendingTv() {
        let { data } = await axios.get('https://api.themoviedb.org/3/trending/tv/week?api_key=44f1f80237012774946ba3a2fbbce7a1')
        setAllTv(data.results)
        setTvData(data)
    }

    useEffect(() => {
        getTrendingMovies()
        getTrendingTv()
    }, [])

    const [moiveObj, setMoiveObj] = useState(null)
    const [tvObj, setTvObj] = useState(null)

    // const [ifMoiveMatch, setIfMoiveMatch] = useState(Boolean)
    // const [ifTvMatch, setIfTvMatch] = useState(Boolean)
    const [word, setWord] = useState(null)
    async function searchMovies(e) {
        setWord( e.target.value)
        // //////////////(Moive)////////////////
        let moivesTitels = []
        let allMoivesTitels = []

        MoiveData.results.map(function (MoiveArry, index) {
            moivesTitels.push(MoiveArry.title)
            // console.log(moivesTitels);
            if (moivesTitels[index].toLowerCase().includes(e.target.value.toLowerCase()) == true) {
                allMoivesTitels.push(MoiveArry)
                // setIfMoiveMatch(true)
            }
            // else { 
            //     setIfMoiveMatch(false)
            // }
        })
        setMoiveObj(allMoivesTitels)
        // //////////////(Tv)////////////////
        let tvsTitels = []
        let allTvsTitels = []


        TvData.results.map(function (TvArry, index) {
            tvsTitels.push(TvArry.name)
            // console.log(tvsTitels);
            if (tvsTitels[index].toLowerCase().includes(e.target.value.toLowerCase()) == true) {
                allTvsTitels.push(TvArry)
                // setIfTvMatch(true)
            }
            // else {
            //     setIfTvMatch(false)
            // }
        })
        setTvObj(allTvsTitels)
    }

    return (
        <React.Fragment>

            <input onChange={searchMovies} type="search" className='form-control w-75 m-auto mt-5' placeholder='Search here :' />

            {moiveObj && tvObj && word != "" ? <div className="container-fluid">
                <div className=" MOIVE row mt-5 px-3 align-items-center">

                    {/* {ifMoiveMatch == true ? <div className="col-md-12 text-center my-4">
                        <h5 className='border border-2 p-2'>Moives:</h5>
                    </div> : ""} */}

                    {moiveObj ? moiveObj.map(function (movie, index) {
                        return <div key={index} className='col-md-2 '>
                            <Link to={`/movieDetails/${movie.id}`}>
                                <img className='w-100' src={"https://image.tmdb.org/t/p/w500/" + movie.poster_path} style={{ cursor: "pointer" }} alt="moive image" />
                                <p className='text-center text-white mt-1'>{movie.title}</p>
                            </Link>
                        </div>
                    }) : ""}
                </div>

                <div className='TV row mt-5 px-3 align-items-center'>

                    {/* {iftVMatch ? <div className="col-md-12 text-center my-4">
                        <h5 className='border border-2 p-2'>Tv shows:</h5>
                    </div> : "" } */}

                    <br />
                    <br />

                    {tvObj ? tvObj.map(function (tv, index) {
                        return <div key={index} className='col-md-2 '>
                            <Link to={`/movieDetails/${tv.id}`}>
                                <img className='w-100' src={"https://image.tmdb.org/t/p/w500/" + tv.poster_path} style={{ cursor: "pointer" }} alt="moive image" />
                                <p className='text-center text-white mt-1'>{tv.name}</p>
                            </Link>
                        </div>
                    }) : ""}

                </div>

            </div> : <>
                {allMovies && allTv ? <div className="container">
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

                    <div className="row mt-5 align-items-center">
                        <div className="col-md-4">
                            <div className="trending">
                                <div className="upper"></div>
                                <h5>Trending Tv to watch now</h5>
                                <p className='text-muted'>Lorem ipsum dolor, sit amet consectetur adipisicing.</p>
                                <div className="lower"></div>
                            </div>
                        </div>

                        {allTv ? allTv.map(function (Tv, index) {
                            return (
                                <div key={index} className="col-md-2">
                                    <Link to={`/tvDetails/${Tv.id}`}>
                                        <div className="Tv">
                                            <img className='w-100' src={"https://image.tmdb.org/t/p/w500/" + Tv.poster_path} style={{ cursor: "pointer" }} alt="Tv image" />
                                            <p className='text-center mt-1'>{Tv.name}</p>
                                        </div>
                                    </Link>
                                </div>
                            )
                        }) : ""}

                    </div>

                </div> : <div className='vh-100 d-flex justify-content-center align-items-center'>
                    <i className='fa-spinner fa-solid fa-spin fa-5x text-white'></i>
                </div>}
            </>
            }


        </React.Fragment >
    )
}
