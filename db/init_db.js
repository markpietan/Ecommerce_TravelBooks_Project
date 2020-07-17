// code to build and initialize DB goes here
const {
  client,

  // other db methods
} = require("./index");

const { createProduct } = require("./products");

const {
  registerUser,
  logInUser,
  getUserById,
  getUserCart,
  getUserOrders,

  // other db methods
} = require("./users");

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
    const email = "jajajajajaja3";
    const password = "hdhdhdhdd12";
    const response = await registerUser({
      email,
      password,
    });
    if (response.length > 0) {
      console.log("User Created");
      const userRows = await logInUser({ email, password });
      console.log(userRows);
      const userRows2 = await getUserById({ id: 505 });
      console.log("User with id 505: " + userRows2);
    } else {
      console.log("Email is already in use");
    }
    // const response = await getUserOrders({ id: 182 });
    await createProduct({
      _id: "1",
      name: "Australia",
      category: "book",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/51qxYm5NXrL.jpg",
      price: 60,
      quantity: 5,
    });
    await createProduct({
      _id: "2",
      name: "Chile",
      category: "book",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/91j-JTFhm0L.jpg",
      price: 60,
      quantity: 5,
    });
    await createProduct({
      _id: "3",
      name: "Columbia",
      category: "book",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/718TnurkpEL._AC_UL200_SR200,200_.jpg",
      price: 60,
      quantity: 5,
    });
    await createProduct({
      _id: "4",
      name: "Denmark",
      category: "book",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/51sOghHa5nL.jpg",
      price: 60,
      quantity: 5,
    });
    await createProduct({
      _id: "5",
      name: "England",
      category: "book",
      imageurl:
        "https://lonelyplanet-weblinc.netdna-ssl.com/product_images/lonely_planet_us/england-travel-guide-10/pdp/5c9a147c6c80950a7baa9f73/pdp_main.jpg?c=1553601660",
      price: 60,
      quantity: 5,
    });
    await createProduct({
      _id: "6",
      name: "Finland",
      category: "book",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/51J5Ox0OKsL._SX322_BO1,204,203,200_.jpg",
      price: 60,
      quantity: 5,
    });
    await createProduct({
      _id: "7",
      name: "France",
      category: "book",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/814kgi01l8L.jpg",
      price: 60,
      quantity: 5,
    });
    await createProduct({
      _id: "8",
      name: "Germany",
      category: "book",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/51ZEihZAatL._SX322_BO1,204,203,200_.jpg",
      price: 60,
      quantity: 5,
    });
    await createProduct({
      _id: "9",
      name: "Honduras",
      category: "book",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/512kn2cFU-L.jpg",
      price: 60,

      quantity: 5,
    });

    await createProduct({
      _id: "10",
      name: "India",
      category: "book",
      imageurl:
        "https://www.a5travelbooks.com/uploads/1/2/0/7/12079777/lonely-planet-india_orig.jpg",
      price: 60,

      quantity: 5,
    });
    await createProduct({
      _id: "11",
      name: "Ireland",
      category: "book",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/51Xj4wMAhpL.jpg",
      price: 60,

      quantity: 5,
    });
    await createProduct({
      _id: "12",
      name: "Lybia",
      category: "book",
      imageurl: "https://s1.dmcdn.net/v/3G6WO1H4R6ZttHqq_/x480",
      price: 60,

      quantity: 5,
    });
    await createProduct({
      _id: "13",
      name: "Morocco",
      category: "book",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/71IaELWkOqL.jpg",
      price: 60,

      quantity: 5,
    });
    await createProduct({
      _id: "14",
      name: "New Zealand",
      category: "book",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/71eUV2Z2XxL.jpg",
      price: 60,

      quantity: 5,
    });
    await createProduct({
      _id: "15",
      name: "Russia",
      category: "book",
      imageurl:
        "https://lonelyplanet-weblinc.netdna-ssl.com/product_images/lonely_planet_us/russia-travel-guide-8/pdp/5a996525d860885921060144/pdp_main.jpg?c=1520002418",
      price: 60,

      quantity: 5,
    });
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
