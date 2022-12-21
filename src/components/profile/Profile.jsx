import React from 'react'
import $ from 'jquery'
import { useState } from 'react'
import { useEffect } from 'react';

export default function Profile({ currentUser }) {
    // console.log(currentUser);

    function editProfile(e) {
        console.log(e.target.innerHTML);
        if (e.target.innerHTML === "Edit") {
            e.target.innerHTML = "Save"
            e.target.classList.remove("btn-danger")
            e.target.classList.add("btn-success")
            $(".fa-pen").css("display", "inline-block")
        } else {
            e.target.innerHTML = "Edit"
            e.target.classList.add("btn-danger")
            $(".fa-pen").css("display", "none")
        }
    }

    const [picture, setPicture] = useState("./assets/avatar.png")

    function changeProfileImage(e) {
        setPicture(URL.createObjectURL(e.target.files[0]))
        localStorage.setItem("profileImage", URL.createObjectURL(e.target.files[0]))
        // console.log(URL.createObjectURL(e.target.files[0]));
    }
    // useEffect(() => {
    //     if (localStorage.getItem("profileImage") === null) {
    //         localStorage.setItem("profileImage", "./assets/avatar.png")
    //     } else {
    //         setPicture(localStorage.getItem("profileImage"))
    //         console.log(localStorage.getItem("profileImage"));
    //     }
    // }, [])




    return (
        <React.Fragment>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-12 text-center m-auto">
                        <div className='position-relative w-25 m-auto'>
                            <img src={picture} className='w-100 Profile_image position-relative' alt="Profile_image" />
                            <div className="layer">
                                <div className='position-relative'>
                                    <label htmlFor='uploading-photo' style={{ position: "absolute", right: "2%", top: "5px", }}>
                                        <i className="fa fa-2x fa-camera"></i>
                                        <input onChange={changeProfileImage} id='uploading-photo' style={{ display: "none" }} type="file" />
                                    </label>
                                </div>
                            </div>
                        </div>



                        <h2 className='py-2'>{currentUser.first_name} {currentUser.last_name}</h2>
                        <h3 className='py-2'>{currentUser.age}</h3>
                        <p className='py-2 text-center text-muted'>E-mail / {currentUser.email}  <i className='fas fa-pen ms-2 text-danger fa-2xs' style={{ verticalAlign: "middle", display: "none", cursor: "pointer" }}></i></p>
                        <p className='py-2 text-center text-muted'>ID / {currentUser.iat} <i className='fas fa-pen ms-2 text-danger fa-2xs' style={{ verticalAlign: "middle", display: "none", cursor: "pointer" }}></i></p>
                    </div>
                    <button onClick={editProfile} className='btn btn-danger col-md-12 w-25 m-auto'>Edit</button>
                </div>
            </div>
        </React.Fragment>
    )
}
