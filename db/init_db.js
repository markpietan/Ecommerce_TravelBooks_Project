// code to build and initialize DB goes here
const {
  client,
  // other db methods
} = require("./index");

async function buildTables() {
  try {
    await client.connect();

    const response = await client.query(`
    DROP TABLE if exists
    userorders;
    DROP TABLE if exists
    usercarts;
    DROP TABLE if exists
    users;
    DROP TABLE if exists
    orders;
    DROP TABLE if exists
    products;
    CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
    );
    CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    details text,
    category VARCHAR (255) NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    price FLOAT NOT NULL,
    imageurl VARCHAR (1000) NOT NULL
    );
    CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    confirmation VARCHAR (255),
    total FLOAT NOT NULL,
    status TEXT DEFAULT 'pending'
    );
    CREATE TABLE userorders(
    id SERIAL PRIMARY KEY,
    "productid" INTEGER,
    amount INTEGER NOT NULL,
    "userid" INTEGER,
    "orderid" INTEGER,
    FOREIGN KEY ("productid") REFERENCES products (id),
    FOREIGN KEY ("userid") REFERENCES users (id),
    FOREIGN KEY ("orderid") REFERENCES orders (id),
    UNIQUE ("productid", "userid", "orderid")
    );
 



    CREATE TABLE usercarts(
      id SERIAL PRIMARY KEY,
      "productId" INTEGER,
      amount INTEGER NOT NULL,
      "userId" INTEGER,
      FOREIGN KEY ("productId") REFERENCES products (id),
      FOREIGN KEY ("userId") REFERENCES users (id),
      UNIQUE ("productId", "userId")
     );
    
    
    
    `);
    console.log("Built successfully");
    return;
    // drop tables in correct order

    // build tables in correct order
  } catch (error) {
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
