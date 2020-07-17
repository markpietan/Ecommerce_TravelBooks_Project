import axios from "axios";
export async function logIn(email, password) {
  try {
    const temp = {
      email,
      password,
    };
    const { data } = await axios.post("/api/users/login", temp);
    return data;
  } catch (error) {
    throw error;
  }
}
