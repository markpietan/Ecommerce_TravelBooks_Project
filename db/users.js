const { client } = require("./index");
// await client.connect()

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
};
