// This is the Web Server
const express = require("express");
const server = express();
const stripe = require("stripe")(
  "sk_test_518heLIHvs9PrrMbVIDjZ7IHuy45NCXN3NWU4ShglQg7ggDKHfPVPOLch8uquGCJJb3yNAddJFNexTpaSscYRK5SU00TlT3CV1u"
);
const uuid = require("uuid");

// create logs for everything
const morgan = require("morgan");
server.use(morgan("dev"));

// handle application/json requests
const bodyParser = require("body-parser");
server.use(bodyParser.json());

// here's our static files
const path = require("path");
server.use(express.static(path.join(__dirname, "build")));

// here's our API
server.use("/api", require("./routes"));
server.post("/payment", (req, res) => {
  const { product, token } = req.body;
  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: customer.id,
          receipt_email: token.email,
          description: `Purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        { idempontencyKey }
      );
    })
    .then((result) => res.status(200).json(result))
    .catch((error) => console.log(error));
});

// by default serve up the react app if we don't recognize the route
// server.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'))
// });

// bring in the DB connection
const { client } = require("./db");

// connect to the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${PORT}!`);

  try {
    await client.connect();
    console.log("Database is open for business!");
  } catch (error) {
    console.error("Database is closed for repairs!\n", error);
  }
});
