import {combineReducers} from "redux"
import appState from "./appState.js"
import notificationState from "./notificationState"
import adminState from "./adminState"
import navState from "./navState"



const allReducer=combineReducers({appState,notificationState,adminState,navState})

export default allReducer
