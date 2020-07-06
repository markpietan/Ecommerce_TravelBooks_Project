import React from "react";

import { Link } from "react-router-dom";

function Nav() {
  const style = {
    color: "black",
    textDecoration: "none",
  };
  return (
    <nav>
      <h3>Travel Books!</h3>
      <Link style={style} to="/home">
        <li>Home</li>
      </Link>

      <Link style={style} to="/cart">
        <li>Cart</li>
      </Link>

      <Link style={style} to="/login">
        <li>Login</li>
      </Link>

      <Link style={style} to="/signup">
        <li>Sign Up</li>
      </Link>
    </nav>
  );
}

export default Nav;
