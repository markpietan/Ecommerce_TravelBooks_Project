const { client } = require("./index");


async function createOrder({ confirmation, total }) {
    try {
      const response = await client.query(
        `
      INSERT INTO orders(confirmation, total)
      VALUES($1, $2)
      RETURNING *;
      `,
        [confirmation, total]
      );
      console.log(response.rows);
      return response.rows;
    } catch (error) {
      throw error;
    }
  }

  module.exports = {createOrder}