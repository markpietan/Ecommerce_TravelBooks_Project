const cartsRouter = require("express").Router();

const {
  getUserById,
  getUserCart,
  addToCart,
  deleteCart,
} = require("./../db/users");

cartsRouter.get("/neworder/:userid", async function (req, res, next) {
  const userid = req.params.userid;
  try {
    // const cart = await deleteCart({id: userid})
    const cart = await getUserCart({ id: userid });
    if (cart.length <= 0) {
      res.send({ Message: "Cart cannot be empty", Success: false });
    }
    
    // res.send({Message: "Successfully deleted", Success: true})
  } catch (error) {
    throw error;
  }
});

cartsRouter.get("/:userid", async function (req, res, next) {
  const userid = req.params.userid;
  try {
    const cart = await getUserCart({ id: userid });
    console.log(cart);
    res.send(cart);
  } catch (error) {
    throw error;
  }
});

cartsRouter.delete("/:userid", async function (req, res, next) {
  const userid = req.params.userid;
  try {
    const cart = await deleteCart({ id: userid });
    console.log();
    res.send({ Message: "Successfully deleted", Success: true });
  } catch (error) {
    throw error;
  }
});

cartsRouter.post("/:userid", async function (req, res, next) {
  const userid = req.params.userid;
  const { productid, amount } = req.body;
  try {
    const rows = await addToCart({ userid, productid, amount });
    if (rows.length > 0) {
      res.send({ Message: "Successfully added to Cart", Success: true });
    }
    res.send({ Message: "Product not added to Cart", Success: false });
  } catch (error) {
    throw error;
  }
});

module.exports = cartsRouter;
