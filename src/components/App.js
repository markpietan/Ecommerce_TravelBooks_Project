import React, { useState, useEffect } from "react";

import { Nav, Home, Cart, Login, SignUp, Admin } from "./Links";

import { registerUser, getUserInfo } from "./../api/users";

import { clearCart, getcart, storeCart } from "./../api/cart";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  withRouter,
} from "react-router-dom";

import { logIn } from "../api/index";
import LandingPage from "./LandingPage";
import { Button, Container, Fade } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

import { getToken, logOut, setUser } from "./../api/auth";

import "./main.css";
const App = () => {
  const successfulLogIn = {
    severity: "success",
    message: "Successfully Logged-in",
    title: "Success!",
    visible: true,
  };
  const successfulSignUp = {
    severity: "success",
    message: "Successfully Signed-up",
    title: "Success!",
    visible: true,
  };
  const failedLogIn = {
    severity: "error",
    message: "Log-in failed",
    title: "Failed!",
    visible: true,
  };
  const failedSignUp = {
    severity: "error",
    message: "Sign-up failed",
    title: "Failed!",
    visible: true,
  };
  const history = useHistory();
  const [currentUser, setcurrentUser] = useState({});
  const [genericMessage, setgenericMessage] = useState({});

  // useEffect(() => {
  //   async function getAdminInfo() {
  //     const data = await getUserInfo();
  //     setcurrentUser(data);
  //   }
  //   getAdminInfo();
  // }, []);

  const [cart, setCart] = useState([]);
  useEffect(function () {
    const token = getToken();
    // console.log(token);
    if (token) {
      setcurrentUser(token);
      setCart(getcart());
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
    storeCart(cartCopy);
  }

  async function onLogInClick(email, password) {
    console.log(email, password);
    const data = await logIn(email, password);
    console.log(data);
    console.log(history);
    if (data.success === true) {
      setgenericMessage(successfulLogIn);
      history.push("/home");
      setcurrentUser({ id: data.id, token: data.token, admin: data.admin });
      setUser({ id: data.id, token: data.token });
    } else {
      setgenericMessage(failedLogIn);
    }
  }

  async function onRegisterClick(email, password) {
    const data = await registerUser(email, password);
    console.log(data);
    if (data.success) {
      setgenericMessage(successfulSignUp);
      setcurrentUser(data.rows[0]);
      console.log(data);
    } else {
      setgenericMessage(failedSignUp);
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
    storeCart(cartCopy);
  }

  function onLogOutClick() {
    setcurrentUser({});
    logOut();
    clearCart();
    setCart([]);
    history.push("/home");
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

      <div className="App">
        <Nav
          cart={cart}
          currentUser={currentUser}
          onLogoutClick={onLogOutClick}
        />
        <Fade in={genericMessage.visible}>
          <Alert
            onClose={() => {
              setgenericMessage({ ...genericMessage, visible: false });
            }}
            severity={genericMessage.severity}
          >
            <AlertTitle>{genericMessage.title}</AlertTitle>
            {genericMessage.message}
          </Alert>
        </Fade>
        <Switch>
          <Route path="/home">
            <Home addToCart={addToCart}></Home>
          </Route>
          <Route path="/cart">
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              addToCart={addToCart}
              user={currentUser}
            ></Cart>
          </Route>
          <Route path="/login">
            {!currentUser.id ? (
              <Login onLogInClick={onLogInClick}></Login>
            ) : null}
          </Route>
          <Route path="/signup">
            <SignUp onRegisterClick={onRegisterClick}></SignUp>
          </Route>
          <Route path="/" exact>
            <LandingPage></LandingPage>
          </Route>
          {currentUser.admin && (
            <Route path="/admin">
              <Admin />
            </Route>
          )}
        </Switch>
      </div>
    </>
  );
};

export default withRouter(App);
