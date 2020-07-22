import React, { useState, useEffect } from "react";
import "./Admin.css";
import {
  TextField,
  Typography,
  Button,
  Grid,
  Container,
} from "@material-ui/core";
// import Item from "./Item";
import { getAllProducts } from "../../api/products";
import AdminItem from "./AdminItem";

function Admin({ onAddClick }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    async function getproducts() {
      const data = await getAllProducts();
      setItems(data);
    }

    getproducts();
  }, []);

  const [item, setItem] = useState({
    name: "",
    category: "",
    imageurl: "",
    price: "",
    quantity: "",
    shorthand: "",
    details: "",
  });

  function handleChange(event) {
    setItem({ ...item, [event.target.name]: event.target.value });
  }

  function handleSubmit(event) {
    event.preventDefault();
    onAddClick(
      item.name,
      item.category,
      item.imageurl,
      item.price,
      item.quantity,
      item.shorthand,
      item.details
    );
    item.name = "";
    item.category = "";
    item.imageurl = "";
    item.price = "";
    item.quantity = "";
    item.shorthand = "";
    item.details = "";
  }
  return (
    <div className="wrapper">
      <div className="banner">
        <Typography className="header" variant="h2" align="center">
          Welcome, Admin
        </Typography>
      </div>
      <div className="addProduct">
        <Typography className="addTitle" variant="h3" align="center">
          Add Product
        </Typography>
        <div className="addInputs">
          <form className="form">
            <TextField
              label="Name"
              placeholder="Name"
              variant="outlined"
              margin="normal"
              required
              value={item.name}
              onChange={handleChange}
            ></TextField>

            <TextField
              label="Category"
              placeholder="Category"
              variant="outlined"
              margin="normal"
              required
              value={item.category}
              onChange={handleChange}
            ></TextField>

            <TextField
              label="Image-URL"
              placeholder="Image-URL"
              variant="outlined"
              margin="normal"
              required
              value={item.imageurl}
              onChange={handleChange}
            ></TextField>

            <TextField
              label="Price"
              placeholder="Price"
              variant="outlined"
              margin="normal"
              required
              value={item.price}
              onChange={handleChange}
            ></TextField>

            <TextField
              label="Quantity"
              placeholder="Quantity"
              variant="outlined"
              margin="normal"
              required
              value={item.quantity}
              onChange={handleChange}
            ></TextField>

            <TextField
              label="Shorthand"
              variant="outlined"
              margin="normal"
              required
              value={item.shorthand}
              onChange={handleChange}
            ></TextField>

            <TextField
              label="Main"
              placeholder="Details"
              variant="outlined"
              margin="normal"
              required
              value={item.details}
              onChange={handleChange}
            ></TextField>

            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </form>
        </div>
      </div>

      <div className="view/edit">
        <Container>
          <Grid container spacing={8} alignContent="center" alignItems="center">
            {items.map(function (item) {
              return <AdminItem item={item} key={item}></AdminItem>;
            })}
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default Admin;
