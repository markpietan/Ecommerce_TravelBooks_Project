import React from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
} from "@material-ui/core";

function AdminItem({ item }) {
  return (
    <Grid item className="adminGrid" xs={6} sm={4} md={3}>
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
              {item.shorthand}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default AdminItem;
