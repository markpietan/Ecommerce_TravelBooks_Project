import React from "react";
export default function Item() {
  return (
    <div className="testProduct">
      <div className="importantText">
        <h4>Test Product 1</h4>
        <h4>img here...</h4>
        <h4>Price</h4>
      </div>
      <div className="add_remove">
        <Button className="minus">-</Button>
        <h4 className="quantity"> 1 </h4>
        <Button className="plus">+</Button>
      </div>
    </div>
  );
}
