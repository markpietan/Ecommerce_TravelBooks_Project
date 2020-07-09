const express = require("express");
const usersRouter = express.Router();

usersRouter.get("/", async (req, res) => {
  //   const users = await getAllUsers();
  //   res.send({
  //     users,
  //   });
  console.log("Anything");
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

module.exports = usersRouter;
