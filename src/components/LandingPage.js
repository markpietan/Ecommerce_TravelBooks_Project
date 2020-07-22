import React from "react";
import { Container, Typography } from "@material-ui/core";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <Container maxWidth={false} disableGutters={true} className="rootLandingPage">
      <div className="overlay">
        <Typography as = "h1" variant= "h1" className= "title">Wander Travel Books</Typography>
      </div>

      <img
        src="https://whenonearth.net/wp-content/uploads/Travel-Books-To-Spark-your-Wanderlust.jpg"
        className="heroImage"
      ></img>
    </Container>
  );
};

export default LandingPage;
