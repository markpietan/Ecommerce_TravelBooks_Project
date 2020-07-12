import React, { Component } from "react";
import axios from "axios";
// import React, { useState } from "react";
import "./SignUp.css";
import {
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
  Input,
  Container,
  TextField,
} from "@material-ui/core";


export default class Registration extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    const { email, password, password_confirmation } = this.state;

    axios
      .post(
        "http://localhost:5000/register",
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.status === "created") {
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch((error) => {
        console.log("registration error", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
          />

          <input
            type="password"
            name="password_confirmation"
            placeholder="Password confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}













// function SignUp() {
//   function onEmailChange(e) {
//     setEmail(e.target.value);
//   }

//   function onPasswordChange(e) {
//     setPassword(e.target.value);
//   }

//   function onConfirmPasswordChange(e) {
//     setConfirmPassword(e.target.value);
//   }

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   return (
//     <Container>
//       <form autoComplete>
//         <TextField
//           id="standard-full-width"
//           label="Email"
//           style={{ margin: 8 }}
//           placeholder="Enter email"
//           fullWidth
//           margin="normal"
//         />
//         <TextField
//           id="standard-full-width"
//           label="Email"
//           style={{ margin: 8 }}
//           placeholder="Enter email"
//           size="medium"
//           variant="outlined"
//           margin="normal"
//           className="passwordInput"
//         />
//         <TextField
//           id="standard-full-width"
//           label="Email"
//           style={{ margin: 8 }}
//           placeholder="Enter email"
//           size="medium"
//           margin="normal"
//           className="passwordInput"
//         />
//       </form>
//     </Container>
//   );
  // return (
  //   <div className="signUpPage">
  //     <h1 className="signUpTitle">Sign Up Page</h1>
  //     <div className="signUpSection">
  //       <h2 className="emailText">Email:</h2>
  //       <input
  //         type="text"
  //         placeholder="Enter email..."
  //         className="emailInput"
  //         value={email}
  //         onChange={onEmailChange}
  //       ></input>
  //       <h2 className="passwordText">Password:</h2>
  //       <input
  //         type="password"
  //         placeholder="Enter Password..."
  //         className="passwordInput"
  //         value={password}
  //         onChange={onPasswordChange}
  //       ></input>
  //       <h2 className="passwordText">Confirm Password:</h2>
  //       <input
  //         type="password"
  //         placeholder="Confirm Password..."
  //         className="passwordInput"
  //         value={confirmPassword}
  //         onChange={onConfirmPasswordChange}
  //       ></input>
  //       <div className="signUpButton">
  //         <Button variant="contained">Sign Up</Button>
  //       </div>
  //       <div className="googleSignUp">
  //         <Button variant="contained">Sign Up With Google</Button>
  //       </div>
  //     </div>
  //   </div>
  // );
// }

// export default SignUp;
