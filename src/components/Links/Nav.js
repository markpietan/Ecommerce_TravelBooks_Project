import React, { useEffect, useState } from "react";

import { NavLink } from "react-router-dom";

import "./Nav.css";

import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import LibraryBooksIcon from "@material-ui/icons/LibraryBooks";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Badge from "@material-ui/core/Badge";
import Hidden from "@material-ui/core/Hidden";

function Nav({ cart, onLogoutClick, currentUser }) {
  const [value, setValue] = useState("1");
  // let itemsInCart = 0;
  const [itemsInCart, setItemsInCart] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log("cart", cart);
  useEffect(
    function () {
      let temp = 0;
      cart.forEach((product) => {
        temp += product.numInCart;
      });
      setItemsInCart(temp);
    },
    [cart]
  );

  useEffect(function () {
    if (window.location.pathname === "/") {
      setValue("1");
    } else if (window.location.pathname === "/home") {
      setValue("2");
    } else if (window.location.pathname === "/cart") {
      setValue("3");
    } else if (window.location.pathname === "/signup") {
      setValue("4");
    } else if (window.location.pathname === "/login") {
      setValue("5");
    }
  }, [currentUser]);

  return (
    <div>
      <TabContext value={value}>
        <AppBar position="static">
          <Hidden only={["lg", "md", "xl", "sm"]}>
            <TabList
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="scrollable"
            >
              <Tab
                label="Main"
                exact
                to="/"
                value="1"
                icon={<LibraryBooksIcon></LibraryBooksIcon>}
                component={NavLink}
              />

              <Tab
                label="Home"
                value="2"
                icon={<HomeIcon></HomeIcon>}
                component={NavLink}
                to="/home"
              />

              <Tab
                label="Cart"
                value="3"
                icon={
                  <Badge badgeContent={itemsInCart} color="secondary">
                    <ShoppingCartIcon></ShoppingCartIcon>
                  </Badge>
                }
                component={NavLink}
                to="/cart"
              />
              {currentUser === null ? (
                <Tab
                  label="Sign-up"
                  value="4"
                  icon={<PersonAddIcon></PersonAddIcon>}
                  component={NavLink}
                  to="/signup"
                />
              ) : (
                <Tab
                  label="Sign-up"
                  value="4"
                  icon={<PersonAddIcon></PersonAddIcon>}
                  component={NavLink}
                  to="/signup"
                  disabled
                />
              )}

              {currentUser === null ? (
                <Tab
                  label="Log-in"
                  value="5"
                  icon={<AccountBoxIcon></AccountBoxIcon>}
                  component={NavLink}
                  to="/login"
                />
              ) : (
                <Tab
                  label="Log-in"
                  value="5"
                  icon={<AccountBoxIcon></AccountBoxIcon>}
                  component={NavLink}
                  to="/login"
                  disabled
                />
              )}
            </TabList>
          </Hidden>
          <Hidden only="xs">
            <TabList
              onChange={handleChange}
              aria-label="simple tabs example"
              variant="fullWidth"
            >
              <Tab
                label="Main"
                value="1"
                icon={<LibraryBooksIcon></LibraryBooksIcon>}
                component={NavLink}
                to="/"
                exact
              />

              <Tab
                label="Home"
                value="2"
                icon={<HomeIcon></HomeIcon>}
                component={NavLink}
                to="/home"
              />

              <Tab
                label="Cart"
                value="3"
                icon={
                  <Badge badgeContent={itemsInCart} color="secondary">
                    <ShoppingCartIcon></ShoppingCartIcon>
                  </Badge>
                }
                component={NavLink}
                to="/cart"
              />
              {currentUser === null ? (
                <Tab
                  label="Sign-up"
                  value="4"
                  icon={<PersonAddIcon></PersonAddIcon>}
                  component={NavLink}
                  to="/signup"
                />
              ) : (
                <Tab
                  label="Sign-up"
                  value="4"
                  icon={<PersonAddIcon></PersonAddIcon>}
                  component={NavLink}
                  to="/signup"
                  disabled
                />
              )}
              {currentUser === null ? (
                <Tab
                  label="Log-in"
                  value="5"
                  icon={<AccountBoxIcon></AccountBoxIcon>}
                  component={NavLink}
                  to="/login"
                />
              ) : (
                <Tab
                  label="Log-out"
                  value="5"
                  icon={<AccountBoxIcon></AccountBoxIcon>}
                  onClick={onLogoutClick}
                />
              )}
            </TabList>
          </Hidden>
        </AppBar>
      </TabContext>
    </div>
  );

  // const style = {
  //   color: "black",
  //   textDecoration: "none",
  // };
  // return (
  //   <nav>
  //     <h3>Travel Books!</h3>
  //     <NavLink style={style} to="/home">
  //       <li>Home</li>
  //     </NavLink>

  //     <NavLink style={style} to="/cart">
  //       <li>Cart</li>
  //     </NavLink>

  //     <NavLink style={style} to="/login">
  //       <li>Login</li>
  //     </NavLink>

  //     <NavLink style={style} to="/signup">
  //       <li>Sign Up</li>
  //     </NavLink>
  //   </nav>
  // );
}

export default Nav;
