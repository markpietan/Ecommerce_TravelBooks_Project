import React, { useState } from "react";
import "./Home.css";
import Button from "@material-ui/core/Button";
import Item from "./Item.js";

function Home() {
  const [items, setItems] = useState([1, 2, 3, 4, 5]);

  return (
    <div className="homePage">
      <h1 className="title">Home Page</h1>
      <h3 className="testTitle">Products down below</h3>
      {items.map((item) => {
        return <Item item={item}></Item>;
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
