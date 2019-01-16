const initialState={currentActiveMenu:""}

const appState=(state=initialState,action)=>{
  switch(action.type){
    case"SET_ACTIVE_MENU":
      state={...state,currentActiveMenu:action.payload.currentActiveMenu}
      break
  }

  return state
}

export default appState
