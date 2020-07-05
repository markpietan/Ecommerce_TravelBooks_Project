import React from "react";
import "./SignUp.css";
import Button from "@material-ui/core/Button";

function SignUp() {
  return (
    <div className="signUpPage">
      <h1>Sign Up Page</h1>
      <div className="signUpSection">
        <h2 className="emailText">Email:</h2>
        <input
          type="text"
          placeholder="Enter email..."
          className="emailInput"
        ></input>
        <h2 className="passwordText">Password:</h2>
        <input
          type="text"
          placeholder="Enter Password..."
          className="passwordInput"
        ></input>
        <div className="signUpButton">
          <Button variant="contained">Sign Up</Button>
        </div>
        <div className="googleSignUp">
          <Button variant="contained">Sign Up With Google</Button>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
