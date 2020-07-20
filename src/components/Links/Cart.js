import React, { useState } from "react";
import "./Cart.css";
import {
  Button,
  Paper,
  Grid,
  ButtonBase,
  Typography,
  Container,
} from "@material-ui/core";
import StripeCheckout from "react-stripe-checkout";

function Cart({ cart, removeFromCart, addToCart }) {
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

    return fetch(`http://localhost:3000/payment`, {
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
  const rootStyle = { display: "flex", placeItems: "center" };
  return (
    <Container className="root" classes={{root: "root"}}>
      <Typography component="h2" variant="h2" align="center" className= "heading">
        Cart
      </Typography>
      {cart.map(function (item) {
        return (
          <Paper className="paper">
            <Grid container spacing={2}>
              <Grid item>
                <ButtonBase className="image">
                  <img alt={item.detail} src={item.imageurl} />
                </ButtonBase>
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="subtitle1">
                      {item.name}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      quantity: {item.numInCart}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {""}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Button
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        removeFromCart(item);
                      }}
                    >
                      Remove One
                    </Button>
                    <Button
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        addToCart(item, 1);
                      }}
                    >
                      Add One
                    </Button>
                  </Grid>
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    ${item.price * item.numInCart}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        );
      })}
      <br></br>
      {/* <StripeCheckout
        stripeKey="pk_test_518heLIHvs9PrrMbVm46vQX5P5oQ17M7GTeJlBElSccp6l6f4oGDhH7Mh6MfCZvjMDdFbxztQNoxrU04s8r3zqpN400xN34EUej"
        token={makePayment}
        name="Travel Books"
        amount={product.price * 100}
        shippingAddress
        billingAddress
        
      > */}
        <Button className="paymentButton" variant="contained">
          Pay With Card
        </Button>
      {/* </StripeCheckout> */}
    </Container>

    // <div className="cartPage">
    //   <h1 className="cartTitle">Cart Page</h1>
    //   <div className="actualCart">
    //     <h3 className="thisIsCart">This is your cart:</h3>
    //     <h3 className="emptyCart">
    //       Your cart is emtpy (only display if cart is emtpy)
    //     </h3>
    //     <h3 className="total">Total: (display total here)</h3>
    //   </div>
    //   <div className="paymentOption">
    //     <StripeCheckout
    //       stripeKey="pk_test_518heLIHvs9PrrMbVm46vQX5P5oQ17M7GTeJlBElSccp6l6f4oGDhH7Mh6MfCZvjMDdFbxztQNoxrU04s8r3zqpN400xN34EUej"
    //       token={makePayment}
    //       name="Travel Books"
    //       amount={product.price * 100}
    //       shippingAddress
    //       billingAddress
    //     >
    //       <Button className="paymentButton" variant="contained">
    //         Pay With Card
    //       </Button>
    //     </StripeCheckout>
    //   </div>
    // </div>
  );
}

export default Cart;
