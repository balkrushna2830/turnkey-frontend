import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './CSS/index.css'
import { authenticate, Login } from './Helper';
const Signin = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        contact: '',
        password: '',
        loading: false,
        error: false
    });
    const [passwordEye, setPasswordEye] = useState("bi bi-eye-slash-fill text-dark");
    const handleChange = (name, event) => {
        event.preventDefault();
        setUser({ ...user, error: false, [name]: event.target.value })
    }
    const toggleEye = (event) => {
        event.preventDefault();
        if (passwordEye === "bi bi-eye-slash-fill text-dark") {
            setPasswordEye("bi bi-eye-fill text-dark")
        } else {
            setPasswordEye("bi bi-eye-slash-fill text-dark")
        }
    }
    const isValid = () => {
        var contactRegex = /^[6-9]\d{9}$/gi;
        var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return {
            contact: contactRegex.test(user.contact),
            password: passwordRegex.test(user.password)
        }
    }
    const loginUser = (e) => {
        e.preventDefault();
        if (isValid().contact && isValid().password) {
            Login(user).then((data) => {
                authenticate(data, () => {
                    if (data.success) {
                        Swal.fire({
                            title: 'Success',
                            text: 'Signup Successful, please login.',
                            icon: 'success',
                        })
                    }
                    navigate('/Dashboard');
                })
            }).catch((err) => {
                console.log(err);
                Swal.fire({
                    title: 'Error',
                    text: 'Unable to signup, Someting went wrong!',
                    icon: 'error',
                })
            })
        }
    }
    const loadingMessage = () => {
        return (
            <div className="alert alert-info" style={{ display: user.loading ? "" : "none" }}>
                Loading
            </div>)
    }
    const errorMessage = () => {
        return (
            <div className="alert alert-danger" style={{ display: user.error ? "" : "none" }}>
                Invalid Phone or Password
            </div>)
    }
    return (
        <div className="login-page" style={{backgroundColor:'#363b41'}}>
            <div className="form">
                <form className="login-form">
                    <div className='mb-3'>
                        {loadingMessage()}
                        {errorMessage()}
                    </div>
                    <label htmlFor="contact" className="form-label">Phone Number</label>
                    <div className="input-group mb-3">
                        <input type="number" maxLength={10} className="form-control" id="contact" placeholder="9890XXXXXX" onChange={e => handleChange("contact", e)} />
                    </div>
                    {user.contact !== '' ? !isValid().contact ? <p className="error-message" >Please enter a valid phone number</p> : '' : ''}
                    {isValid().contact ? <p className="success-message" >Looks Great</p> : ''}
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group mb-3">
                        <input type={passwordEye === "bi bi-eye-slash-fill text-dark" ? 'password' : 'text'} className="form-control" id="password" placeholder="Password" onChange={e => handleChange("password", e)} />
                        <button className="btn btn-secondary" style={{ backgroundColor: '#f2f2f2', border: 'none' }} onClick={e => toggleEye(e)}><i className={passwordEye}></i></button>
                    </div>
                    {user.password !== '' ? !isValid().password || user.password === '' ? <p className="error-message" >Please enter a valid password</p> : '' : ''}
                    {isValid().password ? <p className="success-message" >Looks Great</p> : ''}
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" disabled={!isValid().contact && !isValid().password} onClick={loginUser} type="button">Signin</button>
                    </div>
                    <p className="message">Don't have an account ? &nbsp; <Link className='text-primary' to="/Signup">Signup</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signin