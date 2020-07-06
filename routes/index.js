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

usersRouter.get("/", async (req, res) => {
  const users = await getAllUsers();
  res.send({
    users,
  });
});

usersRouter.post("/register", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const _user = await getUserByUsername(username);
    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user by that username already exists",
      });
    }
    const user = await createUser({
      username,
      password,
    });
    const token = jwt.sign(
      {
        id: user.id,
        username,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );
    res.send({
      message: "youre signed up",
      token,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});
usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: "need username and password",
      message: "enter a username and password",
    });
  }
  try {
    const user = await getUserByUsername(username);
    if (user && user.password == password) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET
      );
      res.send({ message: "logged in", token });
    } else {
      next({
        name: "invalid login",
        message: "invalid login",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);
const productsRouter = require("./products");
apiRouter.use("/products", productsRouter);
const ordersRouter = require("./orders");
apiRouter.use("/orders", ordersRouter);
const userordersRouter = require("./userorders");
apiRouter.use("/userorders", userordersRouter);
const usercartsRouter = require("./usercarts");
apiRouter.use("/usercarts", usercartsRouter);

module.exports = apiRouter;
