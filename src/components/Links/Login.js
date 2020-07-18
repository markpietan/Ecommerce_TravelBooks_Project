import React, { useState } from "react";
import "./Login.css";
import { Button, TextField, Container, Typography} from "@material-ui/core";



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
      <Typography variant= "h2" component= "h2" align= "center">Log-In</Typography>
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
      

  );
}

export default Login;
