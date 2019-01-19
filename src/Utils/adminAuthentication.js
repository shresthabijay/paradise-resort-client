const axios=require("axios")
const {authenticateAdmin}=require("./apis")

export const storeToken=(token)=>{
    return sessionStorage.setItem("paradise-admin-token",token)
}

export const isAuthenticated= ()=>{
    let token=sessionStorage.getItem("paradise-admin-token")

    if(token){
        return token
    }
    else{
        return false
    }
}

export const getToken=()=>{
    return sessionStorage.getItem("paradise-admin-token")
}

export const logout=()=>{
    sessionStorage.removeItem("paradise-admin-token")
}


