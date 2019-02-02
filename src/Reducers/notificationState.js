import store from "../store";

const initialState={show:true,notifications:[],latestNotificationId:0}
//{message:"",link:"",color:""}

const notificationState=(state=initialState,action)=>{
  switch(action.type){
    case "ADD_NOTIFICATIONS":
      let uniqueId=state.latestNotificationId
      let addedNotifications=action.payload.data.map(data=>{
          uniqueId=uniqueId+1
          return {id:uniqueId,...data}
      })
      state={...state,notifications:[...state.notifications,...addedNotifications],latestNotificationId:uniqueId}
      break;

    case "REMOVE_NOTIFICATIONS":

      let updatedNotifications=state.notifications.filter((data)=>{
        
        for(let x=0;x<action.payload.data.length;x++){
            console.log(action.payload.data[x].id===data.id)
            if(action.payload.data[x].id===data.id){
                return false
            }
        }
        return true
                 
      })


      state={...state,notifications:updatedNotifications}

      break;

    default:
        break;

  }

  return state
}

export default notificationState
