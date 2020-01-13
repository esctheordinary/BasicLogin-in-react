import React from 'react';
import './App.css';
import './components/style/style.css';
import { BrowserRouter as Router, Route, Switch, Link, useParams, Redirect, useLocation } from 'react-router-dom';
import Home from './components/home';
import Login from './components/login';
import Register from './components/register';
import ForgotPass from './components/forgotpass';
import AccStat from './components/accoutstat';
import SetPass from './components/setpass';
import NotFound from './components/notfound';


const isAuthenticat = () => {
  let hasAuth = false;
  const user = localStorage.getItem('user')
  if (user === null || user === undefined) {
    hasAuth = false;
  }
  else {
    hasAuth = true;
  }
  return hasAuth
}

function App() {
  return (
    <Router>
      <div className="formParent">
        <Switch>
          <Route exact path="/" component={Welcome} />
          <PrivateRoute path="/home" component={Home} />
          <PrivateRouteUser path="/login" component={Login} />
          <PrivateRouteUser path="/register" component={Register} />
          <PrivateRouteUser path="/forgotpassword" component={ForgotPass} />
          <PrivateRouteNot path="/account_status/:token" component={AccStat} />
          <PrivateRouteNot path="/set_password/:token" component={SetPass} />
          <Route path="/not_found" component={NotFound} />
        </Switch>
      </div>
    </Router >
  );
  function Welcome() {
    return (
      <div><h1>Welcome</h1>
        {isAuthenticat() ? (<Link to="/home">
          <button>Home</button>
        </Link>) : (<Link to="/login">
          <button>Login</button>
        </Link>)}
      </div>
    )
  }
  function PrivateRoute({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={() =>
          isAuthenticat() ? (
            <Component />
          ) : (
              <Redirect
                to={{
                  pathname: "/login",
                }}
              />
            )
        }
      />
    )
  };
  function PrivateRouteUser({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={() =>
          isAuthenticat() ? (
            <Redirect
              to={{
                pathname: "/home",
              }}
            />
          ) : (
              <Component />
            )
        }
      />
    )
  }
  function PrivateRouteNot({ component: Component, ...rest }) {
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuthenticat() ? (
            <Redirect
              to={{
                pathname: "/not_found",
              }}
            />
          ) : (
              <Component {...props} />
            )
        }
      />
    )
  }
}


export default App;
