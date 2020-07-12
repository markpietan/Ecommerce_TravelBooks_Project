import React, { useState } from "react";
import Button from "@material-ui/core/Button";

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
        <h4>item</h4>
        <h4>img here...</h4>
        <h4>Price</h4>
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
    </div>
  );
}
