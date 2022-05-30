import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './CSS/index.css'
import { Register } from './Helper';
import Swal from 'sweetalert2'
const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        contact: '',
        password: '',
        cpassword: '',
        loading: false,
        success: false,
        error: false
    });
    const [passwordEye, setPasswordEye] = useState("bi bi-eye-slash-fill text-dark");
    const [cpasswordEye, setCPasswordEye] = useState("bi bi-eye-slash-fill text-dark");
    const handleChange = (name, event) => {
        event.preventDefault();
        setUser({ ...user, error: false, [name]: event.target.value })
    }
    const toggleEye = (name, event) => {
        event.preventDefault();
        if (name === "password") {
            if (passwordEye === "bi bi-eye-slash-fill text-dark") {
                setPasswordEye("bi bi-eye-fill text-dark")
            } else {
                setPasswordEye("bi bi-eye-slash-fill text-dark")
            }
        } else {
            if (cpasswordEye === "bi bi-eye-slash-fill text-dark") {
                setCPasswordEye("bi bi-eye-fill text-dark")
            } else {
                setCPasswordEye("bi bi-eye-slash-fill text-dark")
            }
        }
    }
    const isValid = () => {
        var nameRegex = /^[a-zA-Z ]{2,30}$/
        var emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        var contactRegex = /^[6-9]\d{9}$/gi;
        var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return {
            name: nameRegex.test(user.name),
            email: emailRegex.test(user.email),
            contact: contactRegex.test(user.contact),
            password: passwordRegex.test(user.password),
            cpassword: user.password === user.cpassword
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
                Phone number already exists
            </div>)
    }
    const successMessage = () => {
        return (
            <div className="alert alert-success" style={{ display: user.success ? "" : "none" }}>
                Account created successfully
            </div>)
    }
    const registerUser = (e) => {
        e.preventDefault();
        if (isValid().contact && isValid().password) {
            setUser({ ...user, loading: true })
            Register(user).then((data) => {
                if (data.success) {
                    Swal.fire({
                        title: 'Success',
                        text: 'Signup Successful, please login.',
                        icon: 'success',
                    })
                    setUser({
                        ...user,
                        name: '',
                        email: '',
                        contact: '',
                        password: '',
                        cpassword: '',
                        loading: false,
                        success: true,
                        error: false
                    })
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: "Unable to signup, maybe phone number already exists!",
                        icon: 'warning',
                    })
                    setUser({ ...user, error: true, success: false })
                }
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
    return (
        <div className="login-page" style={{backgroundColor:'#363b41'}}>
            <div className="form">
                <form className="login-form">
                    <div className='mb-3'>
                        {loadingMessage()}
                        {errorMessage()}
                        {successMessage()}
                    </div>
                    <label htmlFor="name" className="form-label">Name</label>
                    <div className="input-group mb-3">
                        <input type="name" maxLength={30} className="form-control" id="name" placeholder="John Doe" onChange={e => handleChange("name", e)} />
                    </div>
                    {user.name !== '' ? !isValid().name ? <p className="error-message" >Please enter a valid name</p> : '' : ''}
                    {isValid().name ? <p className="success-message" >Looks Great</p> : ''}
                    <label htmlFor="email" className="form-label">email</label>
                    <div className="input-group mb-3">
                        <input type="email" maxLength={30} className="form-control" id="email" placeholder="john@example.com" onChange={e => handleChange("email", e)} />
                    </div>
                    {user.email !== '' ? !isValid().email ? <p className="error-message" >Please enter a valid email</p> : '' : ''}
                    {isValid().email ? <p className="success-message" >Looks Great</p> : ''}
                    <label htmlFor="contact" className="form-label">Phone Number</label>
                    <div className="input-group mb-3">
                        <input type="number" maxLength={10} className="form-control" id="contact" placeholder="9890XXXXXX" onChange={e => handleChange("contact", e)} />
                    </div>
                    {user.contact !== '' ? !isValid().contact ? <p className="error-message" >Please enter a valid phone number</p> : '' : ''}
                    {isValid().contact ? <p className="success-message" >Looks Great</p> : ''}
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group mb-3">
                        <input type={passwordEye === "bi bi-eye-slash-fill text-dark" ? 'password' : 'text'} className="form-control" id="password" placeholder="Password" onChange={e => handleChange("password", e)} />
                        <button className="btn btn-secondary" style={{ backgroundColor: '#f2f2f2', border: 'none' }} onClick={e => toggleEye("password", e)}><i className={passwordEye}></i></button>
                    </div>
                    {user.password !== '' ? !isValid().password || user.password === '' ? <p className="error-message" >Please enter a valid password</p> : '' : ''}
                    {isValid().password ? <p className="success-message" >Looks Great</p> : ''}
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <div className="input-group mb-3">
                        <input type={cpasswordEye === "bi bi-eye-slash-fill text-dark" ? 'password' : 'text'} className="form-control" id="cpassword" placeholder="Confirm Password" disabled={!isValid().password} onChange={e => handleChange("cpassword", e)} />
                        <button className="btn btn-secondary" style={{ backgroundColor: '#f2f2f2', border: 'none' }} onClick={e => toggleEye("cpassword", e)}><i className={cpasswordEye}></i></button>
                    </div>
                    {user.cpassword !== '' ? !isValid().cpassword || user.cpassword === '' ? <p className="error-message" >Not match with Password</p> : '' : ''}
                    {user.cpassword !== '' ? isValid().cpassword ? <p className="success-message" >Looks Great</p> : '' : ''}
                    <div className="d-grid gap-2">
                        <button className="btn btn-primary" onClick={registerUser} disabled={!isValid().contact && !isValid().password} type="button">Signup</button>
                    </div>
                    <p className="message">Already have an account ? <Link to="/" className='text-primary'>Signin</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Signup