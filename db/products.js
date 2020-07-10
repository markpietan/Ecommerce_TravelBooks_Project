const { client } = require("./index");
const {generateUpdateString} = require("./../src/api/utils")
async function createProduct({ category, quantity, price, imageurl, name, details }) {
    try {
      const response = await client.query(
        `
      INSERT INTO products(category, quantity, price, imageurl, name, details)
      VALUES($1, $2, $3, $4, $5, $6)
      ON CONFLICT DO NOTHING RETURNING *;
      `,
        [category, quantity, price, imageurl, name, details]
      );
      console.log(response.rows);
      return response.rows;
    } catch (error) {
      throw error;
    }
  }

  async function updateProduct({ id, fields = {} }) {
    try {
      const updateString = generateUpdateString(fields)
      if (updateString.length === 0) {
        return []
      } 
      const response = await client.query(
        `
      UPDATE products SET ${updateString}
      WHERE id = ${id} 
      RETURNING *;
      `, Object.values(fields)
       
      );
      console.log(response.rows);
      return response.rows;
    } catch (error) {
      throw error;
    }
  }


  async function deleteProduct({ id }) {
    try {
    
      const response = await client.query(
        `
      DELETE FROM products 
      WHERE id = $1 
      RETURNING *;
      `, [id] 
       
      );
      console.log(response.rows);
      return response.rows;
    } catch (error) {
      throw error;
    }
  }


  async function getProductById({ id }) {
    try {
      const response = await client.query(
        `
              SELECT * FROM products
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


  async function getAllProduct() {
    try {
    
      const response = await client.query(
        `
      SELECT * FROM products; 
      `
       
      );
      console.log(response.rows);
      return response.rows;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
createProduct,
deleteProduct, 
getAllProduct,
updateProduct,
getProductById
}