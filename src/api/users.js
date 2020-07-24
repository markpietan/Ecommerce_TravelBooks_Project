import axios from "axios";

export async function registerUser(email, password) {
  try {
    const { data } = await axios.post(
      "/api/users/register",
      {
        email,
        password,
      }
      // { withCredentials: true }
    );
    return data;
  } catch (error) {
    throw error;
  }
}
