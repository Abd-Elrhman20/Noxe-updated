import React, { useState } from 'react'
import Joi from "joi";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import $ from "jquery";

export default function Register() {

    const [user, setUser] = useState({
        "first_name": "",
        "last_name": "",
        "age": "",
        "email": "",
        "password": ""
    })
    const [errorList, setErrorList] = useState(null)
    const navigate = useNavigate();

    function getUser(e) {
        setErrorList(null)
        setApiError(null)

        let idOfChangedInput = e.target.id
        let inputValue = e.target.value
        let newUser = { ...user }
        newUser[idOfChangedInput] = inputValue   // object['']
        setUser(newUser)
        // console.log(newUser);
    }

    const [apiError, setApiError] = useState(null)
    async function submitUser(e) {
        setClickedBtn(true)
        e.preventDefault()                      // prevent page from reloading                                                                                                                                                                          
        // console.log(user);

        let schema = Joi.object({
            first_name: Joi.string().min(3).max(30).required(),
            last_name: Joi.string().min(3).max(30).required(),
            age: Joi.number().min(18).max(100).required(),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(/^[a-z0-9]{8,}$/i).required()
        })
        let resultOfValidation = schema.validate(user, { abortEarly: false });
        if (resultOfValidation.error == undefined) {
            let { data } = await axios.post("https://route-movies-api.vercel.app/signup", user)

            if (data.message == "success") {
                $(".alert-success").fadeIn(1000).fadeOut(1000, function () {
                    navigate("/login")
                })
            }
            else {
                setApiError(data.message)
            }
        }
        else {
            let listOfError = resultOfValidation.error.details
            setErrorList(listOfError)
        }
        setClickedBtn(false)
    }

    function navigateToLogin() {
        navigate("/login")
    }

    function getSpecifiedError(key) {
        if (errorList != null) {
            for (let i = 0; i < errorList.length; i++) {
                if (key == errorList[i].context.key) {
                    return errorList[i].message
                }
            }
        }
    }
    const [clickedBtn, setClickedBtn] = useState(false)


    return (
        <React.Fragment>
            <div className='w-75 m-auto mt-5'>
                <h3>Registeration form</h3>
                <div style={{ display: "none" }} className='alert alert-success text-center'>Register Succedded</div>
                {apiError ? <div className='alert alert-danger'>{apiError}</div> : ""}

                <form onSubmit={submitUser} className='mt-4'>
                    <label htmlFor="first_name">Frist name : </label>
                    <input onChange={getUser} id='first_name' type="text" placeholder='First name' className='form-control mt-1 mb-4' />
                    {getSpecifiedError("first_name") ? <div className='alert alert-danger'>{getSpecifiedError("first_name")}</div> : null}

                    <label htmlFor="last_name">Last name : </label>
                    <input onChange={getUser} id='last_name' type="text" placeholder='Last name' className='form-control mt-1 mb-4' />
                    {getSpecifiedError("last_name") ? <div className='alert alert-danger'>{getSpecifiedError("last_name")}</div> : null}

                    <label htmlFor="age">Age : </label>
                    <input onChange={getUser} id='age' type="number" placeholder='age' className='form-control mt-1 mb-4' />
                    {getSpecifiedError("age") ? <div className='alert alert-danger'>{getSpecifiedError("age")}</div> : null}

                    <label htmlFor="email">E-mail : </label>
                    <input onChange={getUser} id='email' type="email" autoComplete='username' placeholder='email' className='form-control mt-1 mb-4' />
                    {getSpecifiedError("email") ? <div className='alert alert-danger'>{getSpecifiedError("email")}</div> : null}

                    <label htmlFor="password">Password : </label>
                    <input onChange={getUser} id='password' autoComplete='current-password' type="password" placeholder='password' className='form-control mt-1 mb-4' />
                    {/* {getSpecifiedError("password") ? <div className='alert alert-danger'>{getSpecifiedError("password")}</div> : null} */}
                    {getSpecifiedError("password") ? <div className='alert alert-danger'>password must be at least eight characters  and include letters from [a - z] and numbers from [0 - 10]</div> : ""}

                    <button className='btn btn-outline-info'>
                        {clickedBtn ? <i className='fa-spin fa-spinner fa-solid fa-1x'></i> : "Register"}
                    </button>
                    <button onClick={navigateToLogin} className='btn btn-outline-light ms-4'>Have an E-mail</button>
                </form>
            </div>
        </React.Fragment>
    )
}
