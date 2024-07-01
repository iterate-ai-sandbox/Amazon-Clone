import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../firebase";
import "./Login.css";
import mixpanel from 'mixpanel-browser';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = (e) => {
    e.preventDefault();
    mixpanel.track('Sign In Attempted', { email });

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        mixpanel.track('Sign In Successful', { email });
        history.push("/");
      })
      .catch((error) => {
        mixpanel.track('Sign In Failed', { email, error: error.message });
        alert(error.message);
      });
  };

  const register = (e) => {
    e.preventDefault();
    mixpanel.track('Register Attempted', { email });

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        mixpanel.track('Register Successful', { email });
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => {
        mixpanel.track('Register Failed', { email, error: error.message });
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login-container">
        <h1>Sign-in</h1>

        <form action="">
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={signIn} className="login-signInButton">
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button onClick={register} className="login-registerButton">
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}
export default Login;
