export function setUser(token){
   localStorage.setItem("user", token)
}

export function logOut(){
    localStorage.removeItem("user")
 }


export function getToken(){
    return localStorage.getItem("user")
 }