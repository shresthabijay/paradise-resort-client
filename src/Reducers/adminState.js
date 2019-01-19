
const initialState={currentAdminName:null,isAdminLoggedIn:null}
const {isAuthenticated,storeToken} =require("../Utils/adminAuthentication")

const appState=(state=initialState,action)=>{
  switch(action.type){
    case"AUTHENTICATE_ADMIN":
      state={...state,currentAdminName:action.payload.adminName,isAdminLoggedIn:action.payload.isAdminLoggedIn}
      break
    case"ADD_ADMIN":
      storeToken(action.payload.token)
      break;

    default:
      break;   
  }

  return state
}

export default appState
