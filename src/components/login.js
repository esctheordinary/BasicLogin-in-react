import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

const fetchAPI = (url, detail) => {
    return fetch(url, {
        'method': 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(detail)
    })
}
const Login = () => {
    const [logDetail, setLogDetail] = useState([]);
    const [response, setResponse] = useState([]);
    const history = useHistory();
    const url = 'http://192.168.0.99:8000/user/login';

    const handlechange = (e) => {
        setLogDetail({ ...logDetail, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        fetchAPI(url, logDetail).
            then((result) => {
                const status = result.status;
                if (status === 200) {
                    return result.json();
                }
                else {
                    console.log("sdbj")
                }
            })
            .then((info) => {
                if (info === undefined || info === null) {
                    alert("wrong credentials")
                }
                else {
                    setResponse(info);
                    localStorage.setItem('user', JSON.stringify(info))
                    alert("You are successfully logged In");
                    history.push('/home');
                }
            })
            .catch((err) => { console.log("err", err) })

    }

    const goBack = () => {
        history.push('/');
    }


    return (
        <div className="formParent">
            <pre></pre>
            <h1>Login</h1>
            <form onSubmit={onSubmit} className="regform">
                <input className="input" value={logDetail.email} type="email" onChange={handlechange} placeholder="Enter your Email" required name="email" /><br />
                <input className="input" value={logDetail.password} type="password" onChange={handlechange} placeholder="Enter your Password" required name="password" /><br />
                <input className="input" type="submit" value="Login" />
            </form>
            <Link to="/forgotpassword">
                <button>Forgot Password</button>
            </Link>
            <Link to="/register">
                <button>Create Account</button>
            </Link>
            <button onClick={goBack}>Back to Home</button>
            <h3>{response.message}</h3>
        </div>
    )
}

export default Login;
