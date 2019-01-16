import {combineReducers} from "redux"
import appState from "./appState.js"
import notificationState from "./notificationState"


const allReducer=combineReducers({appState,notificationState})

export default allReducer
