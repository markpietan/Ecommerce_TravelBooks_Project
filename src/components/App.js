import React, { useState, useEffect } from "react";

import { Nav, Home, Cart, Login, SignUp } from "./Links";

import { BrowserRouter as Router, Switch, Route, useHistory } from "react-router-dom";

import { logIn } from "../api/index";

import { Button, Container, Fade } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { getToken, logOut, setUser } from "./../api/auth";

import "./main.css";
const App = () => {
  const history = useHistory()
  const [currentUser, setcurrentUser] = useState(null);
  const [loginAlert, setloginAlert] = useState(true);
  const [cart, setCart] = useState([]);
  useEffect(function () {
    const token = getToken();
    console.log(token);
    if (token !== undefined) {
      setcurrentUser(token);
    }
  }, []);

  function addToCart(product, numInCart) {
    const cartCopy = Array.from(cart);
    const found = cartCopy.find(function (e) {
      if (e.id === product.id) {
        return true;
      }
      return false;
    });
    console.log(found);
    if (found !== undefined) {
      found.numInCart += numInCart;
    } else {
      cartCopy.push({ numInCart, ...product });
    }

    setCart(cartCopy);
  }

  async function onLogInClick(email, password) {
    console.log(email, password);
    const data = await logIn(email, password);
    console.log(data);
    console.log(history)
    if (data.success === true) {
      setcurrentUser({ id: data.id, token: data.token });
      setUser({ id: data.id, token: data.token });
      // history.push("/home")
    } else {
    }
  }

  function removeFromCart(item) {
    const cartCopy = Array.from(cart);
    const findIndex = cartCopy.findIndex(function (e) {
      if (e.id === item.id) {
        return true;
      }
      return false;
    });
    if (findIndex !== -1) {
      const found = cartCopy[findIndex];
      found.numInCart--;
      if (found.numInCart === 0) {
        cartCopy.splice(findIndex, 1);
      }
    }

    setCart(cartCopy);
  }

  function onLogOutClick() {
    setcurrentUser(null);
    logOut();
  }

  function onModalExit() {
    setloginAlert(false);
    console.log("hello");
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
          <Nav
            cart={cart}
            currentUser={currentUser}
            onLogoutClick={onLogOutClick}
          />
          <Switch>
            <Route path="/home">
              <Home addToCart={addToCart}></Home>
            </Route>
            <Route path="/cart">
              <Cart
                cart={cart}
                removeFromCart={removeFromCart}
                addToCart={addToCart}
              ></Cart>
            </Route>
            <Route path="/login">
              {currentUser === null ? (
                <Login onLogInClick={onLogInClick}></Login>
              ) : null}
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
