import React from "react";
import "./Login.css";
import Button from "@material-ui/core/Button";

function Login() {
  return (
    <div className="loginPage">
      <h1>Login Page</h1>
      <div className="loginSection">
        <h2 className="emailText">Email:</h2>
        <input
          type="text"
          placeholder="Enter email..."
          className="emailInput"
        ></input>
        <h2 className="emailText">Password:</h2>
        <input
          type="text"
          placeholder="Enter Password..."
          className="passwordInput"
        ></input>
        <div className="loginButton">
          <Button variant="contained">Login</Button>
        </div>
        <div className="loginWithGoogle">
          <Button variant="contained">Login With Google</Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
