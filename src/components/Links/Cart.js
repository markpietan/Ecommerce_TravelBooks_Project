import React from "react";
import "./Cart.css";
import Button from "@material-ui/core/Button";

function Cart() {
  return (
    <div className="cartPage">
      <h1 className="cartTitle">Cart Page</h1>
      <div className="actualCart">
        <h3 className="thisIsCart">This is your cart:</h3>
        <h3 className="emptyCart">
          Your cart is emtpy (only display if cart is emtpy)
        </h3>
        <h3 className="total">Total: (display total here)</h3>
      </div>
      <div className="paymentOption">
        <Button className="paymentButton" variant="contained">
          Pay With Card
        </Button>
        <h3>Payment Modal will replace this text</h3>
      </div>
    </div>
  );
}

export default Cart;
