import React from "react";
import "./Home.css";

function Home() {
  return (
    <div className="homePage">
      <h1 className="homeTitle">Home Page</h1>
      <div className="greeting">
        <h3>Welcome!</h3>
        <h3>Login in, or Sign Up above for more!</h3>
      </div>
      <div className="products">
        <h4>Place products in this div</h4>
      </div>
    </div>
  );
}

export default Home;
