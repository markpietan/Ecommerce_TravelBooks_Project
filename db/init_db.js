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
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN
    );
    CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    shorthand text,
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
      name: "Australia",
      category: "Pacific-Oceania",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/51qxYm5NXrL.jpg",
      price: 22.0,
      quantity: 5,
      shorthand:
        "Australia, the smallest continent and one of the largest countries on Earth.",
      details:
        "Australia, the smallest continent and one of the largest countries on Earth, lying between the Pacific and Indian oceans in the Southern Hemisphere. Australia's capital is Canberra, located in the southeast between the larger and more important economic and cultural centres of Sydney and Melbourne.",
    });
    await createProduct({
      _id: "2",
      name: "Chile",
      category: "South America",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/91j-JTFhm0L.jpg",
      price: 15.0,
      quantity: 5,
      shorthand:
        "Chile is a long, tapered stretch of land in the south west of Latin America.",
      details:
        "Chile is a long, tapered stretch of land in the south west of Latin America. Its geography extends from the Antarctic in the extreme south to the Atacama Desert in the north, the most arid in the world. Chile spans three continents.",
    });
    await createProduct({
      _id: "3",
      name: "Colombia",
      category: "South America",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/718TnurkpEL._AC_UL200_SR200,200_.jpg",
      price: 25.0,
      quantity: 5,
      shorthand:
        "It is the fifth largest country in Latin America and home to the world's second...",
      details:
        "It is the fifth largest country in Latin America and home to the world's second largest population of Spanish-speaking people. Colombia is a land of extremes. Through its center run the towering, snow-covered volcanoes and mountains of the Andes. Tropical beaches line the north and west.",
    });
    await createProduct({
      _id: "4",
      name: "Denmark",
      category: "Europe",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/51sOghHa5nL.jpg",
      price: 20.0,
      quantity: 5,
      shorthand:
        "Denmark is a Scandinavian country in Northern Europe bordering the Baltic and the North Sea.",
      details:
        "Denmark is a Scandinavian country in Northern Europe bordering the Baltic and the North Sea. The country consists of a large peninsula and many islands referred to as the Danish Archipelago. Neighboring countries include Germany, Norway, and Sweden.",
    });
    await createProduct({
      _id: "5",
      name: "Dominican Republic",
      category: "Carribean",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/71oOKnzbpbL.jpg",
      price: 100,
      quantity: 5,
      shorthand: "Dominican Republic is the shit.",
      details:
        "Platanos con salami! Platanos con salami! Platanos con salami! Platanos con salami!",
    });
    await createProduct({
      _id: "6",
      name: "England",
      category: "Europe",
      imageurl:
        "https://lonelyplanet-weblinc.netdna-ssl.com/product_images/lonely_planet_us/england-travel-guide-10/pdp/5c9a147c6c80950a7baa9f73/pdp_main.jpg?c=1553601660",
      price: 35.0,
      quantity: 5,
      shorthand:
        "England is the largest part of the island of Great Britain, and it is also the largest constituent country of the United Kingdom.",
      details:
        "England is the largest part of the island of Great Britain, and it is also the largest constituent country of the United Kingdom. Scotland and Wales are also part of Great Britain (and the UK), Scotland to the north and Wales to the west. To the east and south, and part of the west, England is bordered by sea.",
    });
    await createProduct({
      _id: "7",
      name: "Finland",
      category: "Europe",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/51J5Ox0OKsL._SX322_BO1,204,203,200_.jpg",
      price: 30.0,
      quantity: 5,
      shorthand:
        "Finland, country located in northern Europe. Finland is one of the world's most northern and geographically remote countries.",
      details:
        "Finland, country located in northern Europe. Finland is one of the world's most northern and geographically remote countries and is subject to a severe climate. Nearly two-thirds of Finland is blanketed by thick woodlands, making it the most densely forested country in Europe.",
    });
    await createProduct({
      _id: "8",
      name: "France",
      category: "Europe",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/814kgi01l8L.jpg",
      price: 25.0,
      quantity: 5,
      shorthand:
        "France is one of Europe's largest countries. It is bordered by six countries.",
      details:
        "France is one of Europe's largest countries. It is bordered by six countries other nations: Germany, Belgium and Luxembourg to the northeast, Switzerland and Italy to the southeast and Spain to the southwest. The United Kingdom borders France via the English Channel.",
    });
    await createProduct({
      _id: "9",
      name: "Germany",
      category: "Europe",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/51ZEihZAatL._SX322_BO1,204,203,200_.jpg",
      price: 19.99,
      quantity: 5,
      shorthand: "Germany is a country located in the heart of Western Europe.",
      details:
        "Germany is a country located in the heart of Western Europe. It is bordered by Denmark, Poland, Czechia, Austria, Switzerland, France, Luxembourg, Belgium, Netherlands, the North Sea, and the Baltic Sea. Germany has a strategic location on the North European Plain and along the entrance to the Baltic Sea.",
    });
    await createProduct({
      _id: "10",
      name: "Honduras",
      category: "Central America",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/512kn2cFU-L.jpg",
      price: 25.0,
      quantity: 5,
      shorthand:
        "Honduras, officially Republic of Honduras, Spanish República de Honduras, country of Central America...",
      details:
        "Honduras, officially Republic of Honduras, Spanish República de Honduras, country of Central America situated between Guatemala and El Salvador to the west and Nicaragua to the south and east. The Caribbean Sea washes its northern coast, the Pacific Ocean its narrow coast to the south.",
    });

    await createProduct({
      _id: "11",
      name: "India",
      category: "South East Asia",
      imageurl:
        "https://www.a5travelbooks.com/uploads/1/2/0/7/12079777/lonely-planet-india_orig.jpg",
      price: 20.0,

      quantity: 5,
      shorthand:
        "India is a peninsula, bound by the Indian Ocean in the south, the Arabian Sea on the west and Bay of Bengal in the east.",
      details:
        "India is a peninsula, bound by the Indian Ocean in the south, the Arabian Sea on the west and Bay of Bengal in the east. The coastline of India is of about 7,517 km (4,671 mi) long. India has the third largest military force in the world and is also a nuclear weapon state.",
    });
    await createProduct({
      _id: "12",
      name: "Ireland",
      category: "Europe",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/51Xj4wMAhpL.jpg",
      price: 25.0,

      quantity: 5,
      shorthand:
        "It is the continent's second largest island (after Great Britain). The Republic of Ireland occupies 80 percent of this landmass...",
      details:
        "It is the continent's second largest island (after Great Britain). The Republic of Ireland occupies 80 percent of this landmass, while a large chunk of land in the north is part of the United Kingdom.  Ireland is known for its wide expanses of lush, green fields. In fact, its nickname is the Emerald Isle.",
    });
    await createProduct({
      _id: "13",
      name: "Lybia",
      category: "Africa",
      imageurl: "https://s1.dmcdn.net/v/3G6WO1H4R6ZttHqq_/x480",
      price: 19.99,

      quantity: 5,
      shorthand:
        "Libya, country located in North Africa. Most of the country lies in the Sahara desert...",
      details:
        "Libya, country located in North Africa. Most of the country lies in the Sahara desert, and much of its population is concentrated along the coast and its immediate hinterland, where Tripoli (Ṭarābulus), the de facto capital, and Banghāzī (Benghazi), another major city, are located.",
    });
    await createProduct({
      _id: "14",
      name: "Morocco",
      category: "North Africa",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/71IaELWkOqL.jpg",
      price: 30.0,

      quantity: 5,
      shorthand:
        "Morocco is a Northern African country, bordering the North Atlantci Ocean and the Mediterranean Sea...",
      details:
        "Morocco is a Northern African country, bordering the North Atlantci Ocean and the Mediterranean Sea, between Algeria and the annexed Western Sahara. It is one of only three nations (along with Spain and France) to have both Atlantci and Mediterranean coastlines. A large part of Morocco is mountainous.",
    });
    await createProduct({
      _id: "15",
      name: "New Zealand",
      category: "Pacific-Oceania",
      imageurl:
        "https://images-na.ssl-images-amazon.com/images/I/71eUV2Z2XxL.jpg",
      price: 25.0,

      quantity: 5,
      shorthand:
        "A small island nation of just over 4.5 million people, New Zealand is made up of two major land masses...",
      details:
        "A small island nation of just over 4.5 million people, New Zealand is made up of two major land masses (North Island and South Island) and a number of smaller islands including Stewart Island located in the southwestern Pacific Ocean.",
    });
    await createProduct({
      _id: "16",
      name: "Russia",
      category: "Eurasia",
      imageurl:
        "https://lonelyplanet-weblinc.netdna-ssl.com/product_images/lonely_planet_us/russia-travel-guide-8/pdp/5a996525d860885921060144/pdp_main.jpg?c=1520002418",
      price: 19.99,

      quantity: 5,
      shorthand:
        "Russia, the largest country in the world, occupies one-tenth of all the land on Earth.",
      details:
        "Russia, the largest country in the world, occupies one-tenth of all the land on Earth. It spans 11 time zones across two continents (Europe and Asia) and has coasts on three oceans (the Atlantic, Pacific, and Arctic). The Russian landscape varies from desert to frozen coastline, tall mountains to giant marshes.",
    });
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
