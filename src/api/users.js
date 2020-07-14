import axios from "axios";

export function registerUser(email, password) {
  axios
    .post(
      "/api/users/register",
      {
        email,
        password,
      }
      // { withCredentials: true }
    )
    .then((response) => {
      // if (response.data.status === "created") {
      //   props.handleSuccessfulAuth(response.data);
      // }
      console.log("response:", response);
      return response;
    })

    .catch((error) => {
      console.log("registration error", error);
    });
}
