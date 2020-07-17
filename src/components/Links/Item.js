import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import "./Item.css";

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
        <h4>product.name</h4>
        <h4>product.image</h4>
        <h4>product.price</h4>
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
