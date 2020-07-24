

export function storeCart(cart){
const jsonCart = JSON.stringify(cart)
localStorage.setItem("cart", jsonCart)
}


export function getcart(){
const jsonCart = localStorage.getItem("cart")
return JSON.parse(jsonCart)
}

export function clearCart(){
 localStorage.removeItem("cart")   
}