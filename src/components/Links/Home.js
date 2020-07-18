import React, { useState, useEffect } from "react";
import "./Home.css";
import {
  Button,
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Container,
  Typography,
} from "@material-ui/core";
import Item from "./Item.js";
import { getAllProducts } from "../../api/products";
import products from "./product"
function Home({ addToCart }) {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

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
      <Grid container spacing={4}>
        {products.map(function (item) {
          return (
            <Grid item className= "grid-item">
              <Card>
                <CardActionArea>
                  <CardMedia
                    image = {item.image}
                    component="img"
                    alt={""}
                    height="140"
                    title={item.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                     {item.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                    {""}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Add to Cart
                  </Button>
                  <Button size="small" color="primary">
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
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
