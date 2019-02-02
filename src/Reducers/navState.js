const initialState={menuDisplay:"true"}

const appState=(state=initialState,action)=>{
  switch(action.type){
    case"SET_MENU_DISPLAY":
      state={...state,menuDisplay:action.payload.menuDisplay}
      break
    case"TOOGLE_MENU_DISPLAY":
        let newMenuDisplay=state.menuDisplay==="true"?"false":"true"

        state={...state,menuDisplay:newMenuDisplay}
        break
    default:
        break
  }


  return state
}

export default appState
