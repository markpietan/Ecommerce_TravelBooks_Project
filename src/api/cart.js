export function storeCart(cart) {
  const jsonCart = JSON.stringify(cart);
  localStorage.setItem("cart", jsonCart);
}

export function getcart() {
  let jsonCart = localStorage.getItem("cart");
  if (!jsonCart) {
    return [];
  }
  return JSON.parse(jsonCart);
}

export function clearCart() {
  localStorage.removeItem("cart");
}
