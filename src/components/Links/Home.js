import React from "react";
import "./Home.css";
import Button from "@material-ui/core/Button";

function Home() {
  return (
    <div className="homePage">
      <h1 className="title">Home Page</h1>
      <h3 className="testTitle">Products down below</h3>

      <div className="productSection"></div>
    </div>
  );
}

export default Home;
