import React, { useState } from "react";
import Modal from "react-modal";
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

Modal.setAppElement("#root");

export default function Item({ item, addToCart }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [number, setNumber] = useState(1);
  const incrementClickCount = () => {
    setNumber(number + 1);
  };
  const deccrementClickCount = () => {
    if (number > 1) {
      setNumber(number - 1);
    } else {
      setNumber(number);
    }
  };

  return (
    <Grid item className="grid-item" xs={6} sm={4} md={3}>
      <Modal
        isOpen={open}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setOpen(false)}
      >
        <Typography gutterBottom variant="h3" component="h2">
          {item.name}
        </Typography>
        <Typography>{item.category}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {item.details}
        </Typography>
        <Typography>${item.price}</Typography>
        <Typography>Qty: {number}</Typography>

        <CardActions>
          <Button
            onClick={() => {
              addToCart(item, number);
              handleClose();
            }}
          >
            Add to Cart
          </Button>

          <Button onClick={handleClose}>Close</Button>
        </CardActions>
      </Modal>
      <Card>
        <CardActionArea onClick={handleOpen}>
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
              {item.shorthand}
            </Typography>
            <Typography>Qty: {number}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={incrementClickCount}>
            +
          </Button>
          <Button size="small" color="primary" onClick={deccrementClickCount}>
            -
          </Button>
          <Button
            onClick={() => {
              addToCart(item, number);
            }}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
