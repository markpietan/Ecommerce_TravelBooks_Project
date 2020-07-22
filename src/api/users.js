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

export async function getUserInfo() {
  try {
    const { data } = await axios.get("/api/users/getUserInfo", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("lsid"),
      },
    });
    return data;
  } catch (error) {
    throw error;
  }
}
