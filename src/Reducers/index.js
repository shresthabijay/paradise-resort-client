import {combineReducers} from "redux"
import appState from "./appState.js"
import notificationState from "./notificationState"
import adminState from "./adminState"



const allReducer=combineReducers({appState,notificationState,adminState})

export default allReducer
