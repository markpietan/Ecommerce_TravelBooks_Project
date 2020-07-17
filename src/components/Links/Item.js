import React, { useState } from "react";
import Button from "@material-ui/core/Button";
<<<<<<< HEAD
import "./Item.css";
=======
import data from "./product";
import product from "./product";

console.log(data);
>>>>>>> 43b72feec3c67af4a9afbcd5a902d0d6ea1258f8

export default function Item({ item }) {
  const [number, setNumber] = useState(1);
  const incrementClickCount = () => {
    setNumber(number + 1);
  };
  const deccrementClickCount = () => {
    setNumber(number - 1);
  };

  return (
    <div className="testProduct">
      <div className="importantText">
<<<<<<< HEAD
        <h4>product.name</h4>
        <h4>product.image</h4>
        <h4>product.price</h4>
=======
        <h4>{item.name}</h4>
        <img src={item.imageurl}></img>
        <h4>{item.price}</h4>
>>>>>>> 43b72feec3c67af4a9afbcd5a902d0d6ea1258f8
      </div>
      <div className="add_remove">
        <Button className="minus" onClick={deccrementClickCount}>
          -
        </Button>
        <h4 className="quantity"> {number} </h4>
        <Button className="plus" onClick={incrementClickCount}>
          +
        </Button>
      </div>
      <div className="addToCart">
        <Button className="addToButton">Add To Cart</Button>
      </div>
    </div>
  );
}
