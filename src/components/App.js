import React, { useState } from "react";

import { Nav, Home, Cart, Login, SignUp } from "./Links";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./main.css";
const App = () => {
  const [currentUser, setcuurentUser] = useState(null);
  async function onLogInClick(email, password) {
    console.log(email, password);
  }
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/home">
            <Home></Home>
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
  );
};

export default App;
