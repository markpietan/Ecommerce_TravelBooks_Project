export function setUser(user) {
  const stringUser = JSON.stringify(user);
  localStorage.setItem("user", stringUser);
}

export function logOut() {
  localStorage.removeItem("user");
}

export function getToken() {
  const stringUser = localStorage.getItem("user");
  return stringUser;
}
