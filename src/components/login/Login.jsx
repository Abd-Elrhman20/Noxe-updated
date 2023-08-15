import React, { useState } from 'react'
import Joi from "joi";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Login({ decode, message }) {

    const [user, setUser] = useState({
        "email": "",
        "password": ""
    })
    const [errorList, setErrorList] = useState(null)
    const navigate = useNavigate();

    function getUser(e) {
        let idOfChangedInput = e.target.id
        let inputValue = e.target.value
        let newUser = { ...user }
        newUser[idOfChangedInput] = inputValue   // object['']
        setUser(newUser)
        // console.log(newUser);
    }

    const [apiError, setApiError] = useState(null)
    async function submitUser(e) {
        e.preventDefault()                      // prevent page from reloading                                                                                                                                                                          
        // console.log(user);

        let schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string().pattern(/^[a-z0-9]{8,}$/i).required()
        })
        let resultOfValidation = schema.validate(user, { abortEarly: false });

        if (resultOfValidation.error == undefined) {
            let { data } = await axios.post("https://movies-api.routemisr.com/signin", user)
            let userToken = data.token
            localStorage.setItem("userToken", userToken)
            decode()
            if (data.message == "success") {
                navigate("/home")
            }
            else {
                setApiError(data.message)
            }
        }
        else {
            let listOfError = resultOfValidation.error.details
            setErrorList(listOfError)
        }
    }

    function navigateToRegister() {
        navigate("/register")
    }



    return (
        <React.Fragment>
            <div className='w-75 m-auto mt-5'>
                <h3>Login form</h3>
                {message ? <div className='alert alert-danger'>{message}</div> : ""}
                {apiError ? <div className='alert alert-danger'>{apiError}</div> : ""}
                {errorList ? errorList.map((error, index) => { return <div key={index} className='alert alert-danger'>{error.message}</div> }) : ""}
                <form onSubmit={submitUser} className='mt-4'>

                    <label htmlFor="email">E-mail : </label>
                    <input onChange={getUser} id='email' type="email" autoComplete='username' placeholder='email' className='form-control mt-1 mb-4' />

                    <label htmlFor="password">Password : </label>
                    <input onChange={getUser} id='password' autoComplete='current-password' type="password" placeholder='password' className='form-control mt-1 mb-4' />

                    <button className='btn btn-outline-info'>Login</button>
                    <button onClick={navigateToRegister} className='btn btn-outline-light ms-4'>I don't have an e-mail</button>
                </form>
            </div>
        </React.Fragment>
    )
}
