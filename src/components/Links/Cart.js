import React, { useState } from "react";
import "./Cart.css";
import Button from "@material-ui/core/Button";
import StripeCheckout from "react-stripe-checkout";

function Cart() {
  const [product, setProduct] = useState({
    name: "Travel Books",
    price: 10,
    productBy: "Ian, Mark, Andres",
  });

  const makePayment = (token) => {
    const body = {
      token,
      product,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    return fetch(`http://localhost:3002/payment`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        console.log("RESPONSE", response);
        const { status } = response;
        console.log("STATUS", status);
      })
      .catch((error) => console.log(error));
  };
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
        <StripeCheckout
          stripeKey="pk_test_518heLIHvs9PrrMbVm46vQX5P5oQ17M7GTeJlBElSccp6l6f4oGDhH7Mh6MfCZvjMDdFbxztQNoxrU04s8r3zqpN400xN34EUej"
          token={makePayment}
          name="Travel Books"
          amount={product.price * 100}
          shippingAddress
          billingAddress
        >
          <Button className="paymentButton" variant="contained">
            Pay With Card
          </Button>
        </StripeCheckout>

        <h3>Payment Modal will replace this text</h3>
      </div>
    </div>
  );
}

export default Cart;
