import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style/style.css'

const fetchAPI = (url, obj) => {
    return fetch(url, {
        'method': 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(obj)
    })

}
const RegForm = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [regMsg, setRegMsg] = useState({});
    const url = "http://192.168.0.99:8000/user/register";

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    // on submit function
    const onSubmit = (e) => {
        setRegMsg("")
        e.preventDefault();
        fetchAPI(url, user).
            then((result) => {
                return result.json()
            })
            .then((info) => {
                setRegMsg(info);
            })
            .catch((err) => { console.log("err", err) })

    }
    return (
        <div className="formParent">
            <h2>Register</h2>
            <form className="regform" onSubmit={onSubmit}>
                <input className="input" type="text" value={user.name} onChange={handleChange} placeholder="Enter your Name" required name="name" /><br />
                <input className="input" type="email" value={user.email} onChange={handleChange} placeholder="Enter your Email" required name="email" /><br />
                <input className="input" type="password" value={user.password} onChange={handleChange} placeholder="Set your Password" required name="password" /><br />
                <input className="input" type="submit" value="Register" />
            </form>
            <Link to="/login">
                <button>Login</button>
            </Link>
            <p>{regMsg.message}</p>
        </div>
    )
}

export default RegForm;
