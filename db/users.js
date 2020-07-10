const { client } = require("./index");
// await client.connect()
const {createOrder} = require("./order")
async function registerUser({ email, password }) {
  try {
    const response = await client.query(
      `
    INSERT INTO users(email, password)
    VALUES($1, $2)
    ON CONFLICT DO NOTHING RETURNING *;
    `,
      [email, password]
    );
    console.log(response.rows);
    return response.rows;
  } catch (error) {
    throw error;
  }
}

async function addToCart({ userid, productid, amount }) {
  try {
    const response = await client.query(
      `
      INSERT INTO usercarts("userId", "productId", amount)
      VALUES($1, $2, $3)
      ON CONFLICT ("productId", "userId") DO UPDATE SET amount = ${amount} + usercarts.amount
      RETURNING *;
            `,
      [userid, productid, amount]
    );
    console.log(response.rows);
    return response.rows;
  } catch (error) {
    throw error;
  }
}

async function deleteCart({ id }) {
  try {
    const response = await client.query(
      `
   DELETE FROM usercarts 
   WHERE "userId" = $1;
            `,
      [id]
    );
    console.log(response.rows);
    return response.rows;
  } catch (error) {
    throw error;
  }
}

async function logInUser({ email, password }) {
  try {
    const response = await client.query(
      `
        SELECT * FROM users
        WHERE email = $1 and password = $2;
        `,
      [email, password]
    );
    console.log(response.rows);
    return response.rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById({ id }) {
  try {
    const response = await client.query(
      `
            SELECT * FROM users
            WHERE id = $1;
            `,
      [id]
    );
    console.log(response.rows);
    return response.rows;
  } catch (error) {
    throw error;
  }
}

async function createOrderFromCart({ id }) {
  try {
    const cart = await getUserCart({ id });
    if (cart.length <= 0) {
      return { Message: "Cart cannot be empty", Success: false };
    }
    console.log(cart);
    let total = 0;
    cart.forEach((product) => {
      total += product.price * product.amount;
    });
    console.log(total);
    const [order] = await createOrder({ confirmation: "jkndskbkdsb", total });
    console.log(order);
    // const deletedCart = await deleteCart({ id: userid });
    // console.log(deletedCart);
    
    const orderDetailes = await addProductsToOrder({userid: id, orderid: order.id, cart})
    return { Message: "Successfully created order", Success: true };
    // return response.rows;
  } catch (error) {
    throw error;
  }
}

async function addProductsToOrder({userid, orderid, cart = []}){
try {
  for (let index = 0; index < cart.length; index++) {
    const product = cart[index];
    const [response] = await addProductToOrder({userid, orderid, productid: product.id, amount: product.amount})
    console.log(response)
  }
  return undefined
} catch (error) {
  throw error
}

}
// INSERT INTO userorders("userid", "productid", "orderid", amount)
//     VALUES(182, 67, 179, 1000)
//     ON CONFLICT ("productid", "userid", "orderid") DO UPDATE SET amount = 2000 + userorders.amount
//     RETURNING *;
async function addProductToOrder({userid, orderid, productid, amount}){
try {
  console.log(userid, productid, orderid, amount)
  const response = await client.query(`
    INSERT INTO userorders("userid", "productid", "orderid", amount)
    VALUES($1, $2, $3, $4)
    ON CONFLICT ("productid", "userid", "orderid") DO UPDATE SET amount = ${amount} + userorders.amount
    RETURNING *;
    
  `, [userid, productid, orderid, amount])
  console.log(response.rows)
  return response.rows
} catch (error) {
  throw error
}

}


async function getUserCart({ id }) {
  try {
    const response = await client.query(
      `
                SELECT usercarts.*, products.name, products.details, products.price, products.imageurl
                FROM usercarts
                JOIN products ON products.id = usercarts."productId"
                WHERE usercarts."userId" = $1
                `,
      [id]
    );
    console.log(response.rows);
    return response.rows;
  } catch (error) {
    throw error;
  }
}

async function getUserByEmail({ email }) {
  try {
    const response = await client.query(
      `
               SELECT * FROM users
               WHERE email = $1
                `,
      [email]
    );
    console.log(response.rows);
    return response.rows;
  } catch (error) {
    throw error;
  }
}

async function getUserOrders({ id }) {
  try {
    const response = await client.query(
      `
                  SELECT userorders.*, products.name, products.details, products.price, products.imageurl, 
                  orders.confirmation, orders.status, orders.total
                  FROM userorders
                  JOIN products ON products.id = userorders."productid"
                  JOIN orders ON orders.id = userorders."orderid"
                  WHERE userorders."userid" = $1
                  `,
      [id]
    );
    console.log(response.rows);
    return response.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  registerUser,
  logInUser,
  getUserById,
  getUserCart,
  getUserOrders,
  getUserByEmail,
  deleteCart,
  createOrderFromCart,
  addToCart,
  addProductToOrder,
  addProductsToOrder
};
