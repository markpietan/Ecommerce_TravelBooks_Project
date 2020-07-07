const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;
const apiRouter = require("express").Router();

apiRouter.use(async (req, res, next) => {
  try {
    const prefix = "Bearer";
    const auth = req.header("Authorization");
    if (!auth) {
      next();
    } else if (auth.startsWith(prefix)) {
      const token = auth.slice(prefix.length);

      try {
        const { id } = jwt.verify(token, JWT_SECRET);
        console.log("id", id);
        if (id) {
          req.user = await getUserById(id);
          console.log("req.user", req.user);
          next();
        }
      } catch ({ name, message }) {
        console.log(name, message);
        next({ name, message });
      }
    } else {
      next({
        name: "AuthorizationHeaderError",
        message: `Authorization token must start with ${prefix}`,
      });
    }
  } catch (error) {
    console.log(error);
  }
});


const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);
const ordersRouter = require("./orders");
apiRouter.use("/orders", ordersRouter);
// const userordersRouter = require("./userorders");
// apiRouter.use("/userorders", userordersRouter);
const cartsRouter = require("./carts");
apiRouter.use("/carts", cartsRouter);

module.exports = apiRouter;
