import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'

export default function Navbar({ currentUser, logOut }) {

    $(".nav-link").click(function () {
        $(".nav-link").removeClass("active");
        $(this).addClass("active");
    })

    let navigate = useNavigate();
    function navigateUserToProfile() {
        navigate("/profile");
    }


    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="home">Noxe</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {currentUser ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active underLine" aria-current="page" to="home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link underLine" aria-current="page" to="movie">Movie</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link underLine" aria-current="page" to="tv">Tv</Link>
                            </li>
                        </ul> : ""}

                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center" style={{ cursor: "pointer" }}>
                            <li>
                                <i className='fa-brands me-3 fa-facebook-f'></i>
                                <i className='fa-brands me-3 fa-twitter'></i>
                                <i className='fa-brands me-3 fa-spotify'></i>
                                <i className='fa-brands me-3 fa-instagram'></i>
                            </li>
                            {currentUser ? <img onClick={navigateUserToProfile} src="./assets/avatar.png" alt="Avatar" className="avatar mx-2 my-3 my-md-1" /> : ""}

                            {currentUser ? <li className="nav-item">
                                <span onClick={logOut} className="nav-link" aria-current="page" style={{ cursor: "pointer" }}>LogOut</span>
                            </li> : <React.Fragment> <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="login">Login</Link>
                            </li>
                                <li className="nav-item">
                                    <Link className="nav-link" aria-current="page" to="register">Register</Link>
                                </li> </React.Fragment>}


                        </ul>
                    </div>
                </div>
            </nav>
        </React.Fragment>
    )
}
