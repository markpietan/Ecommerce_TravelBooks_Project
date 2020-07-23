import axios from "axios";

export async function getAllProducts() {
  const data = await axios.get("/api/products");
  console.log(data);
  return data.data;
}

export async function createProduct(item) {
  try {
    const { data } = await axios.post("/api/products", item);
    return data;
  } catch (error) {
    throw error;
  }
}
