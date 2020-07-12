import React, { useState } from "react";
import "./Login.css";
import Button from "@material-ui/core/Button";

function Login() {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  
  function onEmailChange(e){
   setEmail(e.target.value)
  }

  function onPasswordChange(e){
    setPassword(e.target.value)
   }

  return (
    <div className="loginPage">
      <h1 className="loginTitle">Login Page</h1>
      <div className="loginSection">
        <h2 className="emailText">Email:</h2>
        <input
          type="text"
          placeholder="Enter email..."
          className="emailInput"
          value={email}
          onChange={onEmailChange}
        ></input>
        <h2 className="passwordText">Password:</h2>
        <input
          type="password"
          placeholder="Enter Password..."
          className="passwordInput"
          value={password}
          onChange={onPasswordChange}
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
