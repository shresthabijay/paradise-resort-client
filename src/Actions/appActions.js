export const setCurrentMenu=(menuName)=>{
  return({
    type:"SET_ACTIVE_MENU",
    payload:{currentActiveMenu:menuName}
  })
}


