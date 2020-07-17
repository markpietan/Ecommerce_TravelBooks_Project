import React, { useState } from "react";

import { Nav, Home, Cart, Login, SignUp } from "./Links";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { logIn } from "../api/index";

import { Button, Container, Fade } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import{getToken, logOut, setUser} from "./../api/auth"

import "./main.css";
const App = () => {
  const [currentUser, setcurrentUser] = useState(null);
  const [loginAlert, setloginAlert] = useState(true);
  const [cart, setCart] = useState([]);

  function addToCart(product, numInCart){
    alert("Add to cart called")
   const cartCopy = Array.from(cart)
   cartCopy.push({numInCart, ...product})
   setCart(cartCopy)
  }

  async function onLogInClick(email, password) {
    console.log(email, password);
    const data = await logIn(email, password);
    console.log(data);
    if (data.success === true) {
      setcurrentUser(data.token);
      setUser(data.token)
    } else {
    }
  }
  function onModalExit(){
    setloginAlert(false)
    console.log("hello")
  }
  return (
    <>
      {/* <Fade in={loginAlert}  onExiting= {onModalExit}>
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Successfully logged-in
        </Alert>
      </Fade>
      <Fade in={true} timeout={2000}>
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Unsuccessfully logged-in
        </Alert>
      </Fade> */}
      <Router>
        <div className="App">
          <Nav cart={cart}/>
          <Switch>
            <Route path="/home">
              <Home addToCart={addToCart}></Home>
            </Route>
            <Route path="/cart">
              <Cart></Cart>
            </Route>
            <Route path="/login">
              <Login onLogInClick={onLogInClick}></Login>
            </Route>
            <Route path="/signup">
              <SignUp></SignUp>
            </Route>
          </Switch>
        </div>
      </Router>
    </>
  );
};

export default App;
