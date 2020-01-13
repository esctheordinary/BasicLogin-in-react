import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import './style/style.css'

// Function for fetching the api
const fetchAPI = (url, token, newPass) => {
    return fetch(url + token, {
        'method': 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(newPass)
    })
}
const SetPass = ({ match }) => {
    const url = "http://192.168.0.99:8000/user/change_password/";
    const [newPass, setNewPass] = useState([]);
    const [passMsg, setPassMsg] = useState([]);
    const history = useHistory();
    const token = match.params.token;

    let errMsg = '';
    const handleChange = (e) => {
        setNewPass({ ...newPass, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let pass = newPass.new_password;
        let confpass = newPass.confirm_password;
        if (pass === confpass) {
            fetchAPI(url, token, newPass).then((result) => {
                return result.json();
            }).then((info) => {
                setPassMsg(info)
                history.push('/login');
            }).catch((err) => { alert(err, "Something Went Wrong") })
            alert("Password successfully changed")
        }
        else {
            alert("Password Doesn't Match")
        }

    }

    return (
        <div className="formParent">
            <h1>Set New Password</h1>
            <form className="regform" onSubmit={onSubmit}>
                <input className="input" value={newPass.new_password} onChange={handleChange} type="password" placeholder="Enter New Password" required name="new_password" /><br />
                <input className="input" value={newPass.confirm_password} onChange={handleChange} type="password" placeholder="Confirm Password" required name="confirm_password" />
                <span>{errMsg}</span><br />
                <input type="submit" value="Update Password" />
            </form>
            <h2>{passMsg.message}</h2>
        </div>
    )
}

export default SetPass;