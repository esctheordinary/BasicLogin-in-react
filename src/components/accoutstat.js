import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
const AccStat = ({ match }) => {
    const [accStatus, setStatus] = useState({});
    const token = match.params.token;
    const url = "http://192.168.0.99:8000/user/email_verify/";

    async function getUserValue() {
        const res = await fetch(url + token,
            {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
            }).then((result) => {
                console.log(result)
                return result.json();
            }).then((res) => setStatus(res))
    }
    useEffect(() => {
        getUserValue();
    }, []);

    return (
        <div>
            <h2>{accStatus.message}</h2>
            <Link to="/login">
                <button>login</button>
            </Link>
        </div>
    )
}
export default AccStat;
