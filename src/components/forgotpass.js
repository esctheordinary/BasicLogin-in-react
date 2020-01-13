import React, { useState } from 'react';
import './style/style.css'
import { Link } from 'react-router-dom';

const fetchAPI = (url, email) => {
    return fetch(url, {
        'method': 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(email)
    })
}
const ForgotPass = () => {
    const [email, setEmail] = useState({});
    const [msg, setMsg] = useState({});
    const url = "http://192.168.0.99:8000/user/forgot_password";
    const handleChange = (e) => {
        setEmail({ ...email, [e.target.name]: e.target.value })
    }
    const onSubmit = (e) => {
        setMsg("");
        e.preventDefault();
        fetchAPI(url, email)
            .then((result) => {
                // console.log(result)
                return result.json()
            })
            .then((info) => {
                // console.log("info", info)
                setMsg(info);
            })
            .catch((err) => { console.log("err", err) })
    }
    return (
        <div className="formParent">
            <h1>Forgot Password</h1>
            <form onSubmit={onSubmit} className="regform">
                <input className="input" type="email" onChange={handleChange} placeholder="Enter your Email" required name="email" /><br />
                <input className="input" type="submit" value="Verify" />
            </form>
            <Link to="/login">
                <button>Back to login</button>
            </Link>
            <h2>{msg.message}</h2>
        </div>
    )
}

export default ForgotPass;
