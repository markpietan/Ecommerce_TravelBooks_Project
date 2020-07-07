const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
const {
  registerUser,
  logInUser,
  getUserById,
  getUserCart,
  getUserOrders,
  getUserByEmail
} = require("./../db/users");

usersRouter.post("/register", (req, res, next) => {
  const { email, password } = req.body;
  const SALT_COUNT = 10;
  if (password.length < 8) {
    res.send({ message: "password must be 8 characters" });
  }
  bcrypt.hash(password, SALT_COUNT, async function (err, hashedPassword) {
    console.log(hashedPassword);
    try {
      let rows = await registerUser({
        email,
        password: hashedPassword,
      });
      if (rows.length === 0) {
        res.send({
          name: "UserExistsError",
          message: "A user by that username already exists",
        });
      }

      res.send({ rows });
    } catch (error) {
      console.log(error);
      throw error;
    }
  });
});

// usersRouter.post("/register", async (req, res, next) => {
//   const { email, password } = req.body;
//   console.log(email, password);
//   try {
//     const _user = await registerUser({ email, password });
//     if (_user.length === 0) {
//       res.send({
//         name: "UserExistsError",
//         message: "A user by that username already exists",
//       });
//     }
//     const [newUser] = _user;
//     console.log(process.env.JWT_SECRET);
//     const token = jwt.sign(
//       {
//         id: newUser.id,
//         email,
//       },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: "1w",
//       }
//     );
//     res.send({
//       message: "youre signed up",
//       token,
//     });
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });
usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const rows = await getUserByEmail({email});

    if (rows.length === 0) {
      res.send({ message: "user does not exist in database" });
    }
    let hashed = rows[0].password;
    const { id } = rows[0];
  
    bcrypt.compare(password, hashed, function (err, passwordsMatch) {
      if (passwordsMatch) {
        console.log("userloggedin");
        const token = jwt.sign(
          { email, id: id },
          process.env.JWT_SECRET
        );
        console.log(token);
        req.user = { email, id: id };
        res.send({ token });
      } else {
        throw err;
      }
    });
  } catch (error) {
    throw error;
  }
});

module.exports = usersRouter;
