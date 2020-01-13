import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './style/style.css'
const Home = () => {
    const history = useHistory();
    let isAuthenticated = false;

    // For checking the authorization of user
    const isAuth = () => {
        const user = localStorage.getItem('user')
        if (user === null || user === undefined) {
            isAuthenticated = false;
        }
        else {
            isAuthenticated = true;
        }
    }

    // logout function
    const logout = () => {
        localStorage.clear('users');
        history.push('/login')
    }
    isAuth();
    return (
        <div className="formParent">
            <h1>Home</h1>
            {isAuthenticated ? (<button onClick={logout} >Logout</button>) : (
                <Link to="/login">
                    <button>Login</button>
                </Link>
            )}
        </div>
    )
}

export default Home;
