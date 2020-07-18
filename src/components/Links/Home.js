import React, { useState, useEffect } from "react";
import "./Home.css";
import Button from "@material-ui/core/Button";
import Item from "./Item.js";
import Axios from "axios";
import { getAllProducts } from "../../api/products";
function Home({addToCart}) {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    // Create an scoped async function in the hook
    async function getProducts() {
      const data = await getAllProducts();
      setItems(data);
    }
    // Execute the created function directly
    getProducts();
  }, []);

  return (
    <div className="homePage">
      <h1 className="title">Home Page</h1>
      <h3 className="testTitle">Products down below</h3>
      {items.map((item) => {
        return <Item item={item} key= {item.id} addToCart={addToCart}></Item>;
      })}
    </div>
  );
}

export default Home;

// function Home() {
//   return (
//     <div className="homePage">
//       <h1 className="title">Home Page</h1>
//       <h3 className="testTitle">Products down below</h3>

//       <div className="productSection">
//         <div className="testProduct">
//           <div className="importantText">
//             <h4>Test Product 1</h4>
//             <h4>img here...</h4>
//             <h4>Price</h4>
//           </div>
//           <div className="add_remove">
//             <Button className="minus">-</Button>
//             <h4 className="quantity"> 1 </h4>
//             <Button className="plus">+</Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Home;
