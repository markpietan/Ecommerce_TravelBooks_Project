import axios from "axios";

export async function getAllProducts() {
  const data = await axios.get("/api/products");
  console.log(data);
  return data.data;
}
