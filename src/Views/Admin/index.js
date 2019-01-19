import React, { Component } from 'react'
import Sidebar from './Sidebar';
import {Redirect,Switch,Route} from "react-router-dom"
import Booking from './Pages/Booking';
import Rooms from './Pages/Rooms';
import Manage from './Pages/Manage';
import Events from './Pages/Events';
import {withRouter} from "react-router-dom"
import NotificationPanel from "../../Components/Notifcation"
import {addNotifications} from "../../Actions/notificationActions"
import {connect} from "react-redux"
import Authentication from '../../Components/Authentication';
import Setting from './Pages/Setting';


class Admin extends Component {

  componentDidMount=()=>{
    this.props.addNotifications([{message:"Welcome Admin!",color:"success"},{message:"Madarjat kam gar!",color:"info"}])
  }

  render() {
    let matchPath=this.props.match.path
    return (
        <div className="container-fluid admin">
          <div className="row">
              <Sidebar/>
              <div className="col-lg-10 adminPagePanel pr-3 pl-3 pt-2 pb-2">
                <div className="card" style={{minHeight:"100%",border:"none"}}>
                  <Switch>
                    <Route exact path={`${matchPath}/`} component={()=>{
                      return <Redirect to={`${matchPath}/bookings`}/>
                    }}/>
                      <Route path={`${matchPath}/bookings`} component={Booking}/>
                      <Route path={`${matchPath}/rooms`} component={Rooms}/>
                      <Route path={`${matchPath}/events`} component={Events}/>
                      <Route path={`${matchPath}/manage-page`} component={Manage}/>
                      <Route path={`${matchPath}/setting`} component={Setting}/>
                      <Route path="*" component={()=>{return <Redirect to={`${matchPath}/bookings`} />}}/>
                  </Switch>
                </div>
              </div>
          </div>
          <NotificationPanel/>
        </div>
    )
  }
}

let mapDispatchToProps=(dispatch)=>{
  return({
    addNotifications:(notificationsData)=>{
      dispatch(addNotifications(notificationsData))
    }
  })
}

export default withRouter(connect(()=>{return {}},mapDispatchToProps)(Admin))
