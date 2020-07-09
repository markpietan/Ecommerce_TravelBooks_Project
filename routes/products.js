const productsRouter = require("express").Router();
const {
  createProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
  getProductById,
} = require("./../db/products");
productsRouter.post("/", async function (req, res, next) {
try {
    // category, quantity, price, imageurl, name, details 
  const response = await createProduct(req.body)
  console.log(response)
  res.send({Message: "Product was succesfully created"})
} catch (error) {
    throw error
}


});

productsRouter.get("/:productId", async function (req, res, next){
    try {
       const id = req.params.productId
       console.log(id)
       const [response]= await getProductById({id})
       res.send(response)
    } catch (error) {
        throw error
    }
})

productsRouter.get("/", async function (req, res, next) {
try {
  const response = await getAllProduct()  
  res.send(response)
} catch (error) {
    throw error
}
})

productsRouter.patch("/:productsId", async function(req, res, next){
try {
    const id = req.params.productsId
    
    const response = await updateProduct({id, fields:req.body})
  if (response.length === 0) {
      return res.send({Message: "Product was not succesfully updated"})
  }
  res.send({Message: "Product was succesfully updated"})
} catch (error) {
    throw error
}

})

module.exports = productsRouter;
