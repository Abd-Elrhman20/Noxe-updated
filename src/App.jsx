import logo from './logo.svg';
import './App.css';
// import pages
import Home from "./components/home/Home.jsx";
import Register from "./components/register/Register.jsx";
import Login from './components/login/Login.jsx';
import Navbar from './components/navbar/Navbar.jsx';
import Tv from './components/tv/Tv.jsx';
import Movie from './components/movie/Movie.jsx';
import MovieDetails from './components/movieDetails/MovieDetails';
import TvDetails from './components/tvDetails/TvDetails';
import Profile from './components/profile/Profile.jsx';

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function App() {

  const [loggedInUser, setLoggedInUser] = useState(null)
  function getUserToken() {
    let userToken = localStorage.getItem("userToken")
    let userData = jwtDecode(userToken)
    setLoggedInUser(userData)
  }

  let navigate = useNavigate()
  function logout() {
    localStorage.removeItem("userToken")
    setLoggedInUser(null)
    navigate("/login")
  }

  function checkUser() {
    if (localStorage.getItem("userToken") != null) {
      getUserToken()
    }
  }
  useEffect(() => {
    checkUser()
  }, [])


  function ProtectedRoute(props) {
    if (loggedInUser != null) {
      return (
        <React.Fragment>
          {props.children}
        </React.Fragment>
      )
    }
    else {
      // return <Navigate to="/login" />
      return <Login message="Please Login first" decode={getUserToken} />
    }
  }

  // Prevent user from go back to the login&Register page when user logged in
  function PreventLogin() {
    if (loggedInUser != null) {
      return <Navigate to="/home" />
    }
    else {
      return <Login message="Please Login first" decode={getUserToken} />
    }
  }
  function PreventRegiser() {
    if (loggedInUser != null) {
      return <Navigate to="/home" />
    }
    else {
      return <Register />
    }
  }


  // ///////////////////(Redux)/
  // const x = useSelector(state => state)
  // console.log(x);

  return (
    <React.Fragment>
      <Navbar currentUser={loggedInUser} logOut={logout} />

      <Routes>
        <Route path="/" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="home" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
        <Route path="tv" element={<ProtectedRoute> <Tv /> </ProtectedRoute>} />
        <Route path="movie" element={<ProtectedRoute> <Movie /> </ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute> <Profile currentUser={loggedInUser} /> </ProtectedRoute>} />

        <Route path="login" element={<PreventLogin> <Login decode={getUserToken} />  </PreventLogin>} />
        <Route path="register" element={<PreventRegiser> <Register /> </PreventRegiser>} />

        <Route path="movieDetails" element={<ProtectedRoute> <MovieDetails /> </ProtectedRoute>} >
          <Route path=":id" element={<ProtectedRoute> <MovieDetails /> </ProtectedRoute>} />
        </Route>


        <Route path="tvDetails" element={<ProtectedRoute> <TvDetails /> </ProtectedRoute>} >
          <Route path=":id" element={<ProtectedRoute> <TvDetails /> </ProtectedRoute>} />
        </Route>



        <Route path="*" element={<div className='vh-100 d-flex align-items-center justify-content-center '><h1>4 0 4</h1></div>} />
      </Routes>
    </React.Fragment>
  )
}