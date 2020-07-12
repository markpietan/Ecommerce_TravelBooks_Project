import React, { useState } from "react";
import "./Home.css";
import Item from "./Item.js";

function Home() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="homePage">
      <h1 className="title">Home Page</h1>
      <h3 className="testTitle">Products down below</h3>
      {items.map((item) => {
        return <Item item={item}></Item>;
      })}
      <div className="productSection"></div>
    </div>
  );
}

export default Home;
