import React, { useState } from "react";

import "./SignUp.css";
import { registerUser } from "../../api/users";
import { Button, Container, TextField, Typography } from "@material-ui/core";

export default function Registration() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirm, setConfirm] = useState("");

  // function onEmailChange(event) {
  //   setEmail(event.target.value);
  // }

  // function onPasswordChange(event) {
  //   setPassword(event.target.value);
  // }

  // function onConfirmChange(event) {
  //   setConfirm(event.target.value);
  // }

  function handleChange(event) {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    registerUser(user.email, user.password);
  }

  return (
    <Container>
      <Typography variant="h2" component="h2" align="center">
        Sign-Up
      </Typography>
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
          value={user.email}
          onChange={handleChange}
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
          value={user.password}
          onChange={handleChange}
          type="password"
          fullWidth
        ></TextField>
        <TextField
          label="Confirm Password"
          style={{ margin: 8 }}
          placeholder="Re-enter password"
          size="medium"
          variant="outlined"
          margin="normal"
          className="passwordInput"
          required
          value={user.password_confirmation}
          onChange={handleChange}
          type="password"
          fullWidth
        ></TextField>
        <Button
          type="submit"
          color="primary"
          variant="contained"
          onClick={handleSubmit}
        >
          Register
        </Button>
      </form>
    </Container>
  );
}
