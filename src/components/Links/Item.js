import React, { useState } from "react";

import "./Item.css";
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

export default function Item({ item, addToCart }) {
  const [number, setNumber] = useState(1);
  const incrementClickCount = () => {
    setNumber(number + 1);
  };
  const deccrementClickCount = () => {
    setNumber(number - 1);
  };

  return (
    <Grid item className="grid-item" xs= {6} sm= {4} md= {3}>
      <Card>
        <CardActionArea>
          <CardMedia
            image={item.imageurl}
            component="img"
            alt={item.details}
            height="140"
            title={item.name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.name}
            </Typography>
            <Typography>{item.category}</Typography>
            <Typography>${item.price}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {item.details}
            </Typography>
            <Typography>{number}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={incrementClickCount}>
            +
          </Button>
          <Button size="small" color="primary" onClick={deccrementClickCount}>
            -
          </Button>
          <Button onClick= {() => {addToCart(item, number)}}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
    // <div className="testProduct">
    //   <div className="importantText">
    //     <h4>{item.name}</h4>
    //     <img src={item.imageurl}></img>
    //     <h4>{item.price}</h4>
    //   </div>
    //   <div className="add_remove">
    //     <Button className="minus" onClick={deccrementClickCount}>
    //       -
    //     </Button>
    //     <h4 className="quantity"> {number} </h4>
    //     <Button className="plus" onClick={incrementClickCount}>
    //       +
    //     </Button>
    //   </div>
    //   <div className="addToCart">
    //     <Button className="addToButton" onClick= {() => {addToCart(item, number)}}>Add To Cart</Button>
    //   </div>
    // </div>
  );
}
