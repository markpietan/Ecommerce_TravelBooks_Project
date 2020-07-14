const usersRouter = require("express").Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
const { requireUser } = require("./../src/api/utils");
const {
  registerUser,
  logInUser,
  getUserById,
  getUserCart,
  getUserOrders,
  getUserByEmail,
} = require("./../db/users");

usersRouter.post("/register", (req, res, next) => {
  const { email, password } = req.body;
  console.log("registering", email, password);
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
    const rows = await getUserByEmail({ email });

    if (rows.length === 0) {
      res.send({ message: "user does not exist in database" });
    }
    let hashed = rows[0].password;
    const { id } = rows[0];

    bcrypt.compare(password, hashed, function (err, passwordsMatch) {
      if (passwordsMatch) {
        console.log("userloggedin");
        const token = jwt.sign({ email, id: id }, process.env.JWT_SECRET);
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
//should orders have its own route file?
usersRouter.get("/orders/:userid", async function (req, res, next) {
  try {
    const orders = await getUserOrders({ id: req.params.userid });
    if (orders.length === 0) {
      return res.send({ Message: "You have no orders" });
    }
    //format the array before sending to the front end...
    //the array has multiple orders that are associated with the user...
    //loop through the array and combine all products from one specific order into an array....
    //console.log(orders) to check...
    res.send(orders);
  } catch (error) {
    throw error;
  }
});

module.exports = usersRouter;
