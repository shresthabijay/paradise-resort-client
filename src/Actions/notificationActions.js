export const addNotifications=(notificationsData)=>{
    return({
      type:"ADD_NOTIFICATIONS",
      payload:{data:notificationsData}
    })
}

export const removeNotifications=(notificationsData)=>{
    return({
      type:"REMOVE_NOTIFICATIONS",
      payload:{data:notificationsData}
    })
}
  
  
  