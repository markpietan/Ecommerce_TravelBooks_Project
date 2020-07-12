import React from "react";

import { Nav, Home, Cart, Login, SignUp } from "./Links";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./main.css";
const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
