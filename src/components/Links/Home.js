import React, { useState, useEffect } from "react";
import "./Home.css";
import { Grid, Container } from "@material-ui/core";
import Item from "./Item.js";
import { getAllProducts } from "../../api/products";
function Home({ addToCart }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function getProducts() {
      const data = await getAllProducts();
      setItems(data);
    }
    // Execute the created function directly
    getProducts();
  }, []);

  return (
    <Container>
      <Grid container spacing={8} alignContent="center" alignItems= "center">
        {items.map(function (item) {
          return <Item item={item} addToCart={addToCart} key={item.id}></Item>;
        })}
      </Grid>
    </Container>

    // <div className="homePage">
    //   <h1 className="title">Home Page</h1>
    //   <h3 className="testTitle">Products down below</h3>
    //   {items.map((item) => {
    //     return <Item item={item} key= {item.id} addToCart={addToCart}></Item>;
    //   })}
    // </div>
  );
}

export default Home;
