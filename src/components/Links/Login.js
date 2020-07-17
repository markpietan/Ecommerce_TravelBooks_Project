import React, { useState } from "react";
import "./Login.css";
import { Button, TextField, Container, Box } from "@material-ui/core";

function Login({ onLogInClick }) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function onEmailChange(e) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e) {
    setPassword(e.target.value);
  }

  return (
    <Container>
      <form>
        <TextField
          label="Email"
          style={{ margin: 8 }}
          placeholder="Enter email"
          size="medium"
          variant="outlined"
          margin="normal"
          className="emailInput"
          required
          value={email}
          onChange={onEmailChange}
          fullWidth
        ></TextField>
        <TextField
          label="Password"
          style={{ margin: 8 }}
          placeholder="Enter password"
          size="medium"
          variant="outlined"
          margin="normal"
          className="passwordInput"
          required
          value={password}
          onChange={onPasswordChange}
          type="password"
          fullWidth
        ></TextField>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            if (email !== "" && password !== "") {
              onLogInClick(email, password);
            }
          }}
        >
          Sign In
        </Button>
      </form>
    </Container>
    // <div className="loginPage">
    //   <h1 className="loginTitle">Login Page</h1>
    //   <div className="loginSection">
    //     <h2 className="emailText">Email:</h2>
    //     <input
    //       type="text"
    //       placeholder="Enter email..."
    //       className="emailInput"
    //       value={email}
    //       onChange={onEmailChange}
    //     ></input>
    //     <h2 className="passwordText">Password:</h2>
    //     <input
    //       type="password"
    //       placeholder="Enter Password..."
    //       className="passwordInput"
    //       value={password}
    //       onChange={onPasswordChange}
    //     ></input>
    //     <div className="loginButton">
    //       <Button variant="contained">Login</Button>
    //     </div>
    //     <div className="loginWithGoogle">
    //       <Button variant="contained">Login With Google</Button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Login;
