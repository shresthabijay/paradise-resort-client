export const setMenuDisplay=(menuDisplay)=>{
    return({
      type:"SET_MENU_DISPLAY",
      payload:{menuDisplay}
    })
  }

export const toggleMenuDisplay=()=>{
    return({
      type:"TOOGLE_MENU_DISPLAY",
      payload:{}
    })
}
  
  
  