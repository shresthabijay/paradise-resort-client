import React, { Component } from 'react'
import BookingSection from "./BookingSection"
import {Switch,Route,Redirect} from "react-router-dom"
import PayementSection from './PayementSection';
import BookingSuccess from './InfoBooking';

export default class Booking extends Component {
  render() {
    let matchPath=this.props.match.path
    return (
    <Switch>
      <Route exact path={`${matchPath}/`} component={BookingSection}/>
      <Route path={`${matchPath}/payment`} component={PayementSection}/> 
      <Route path={`${matchPath}/bookinginfo`} component={BookingSuccess}/>
      {/* <Route component={()=>{
        return <Redirect to="/"/>
      }}/>  */}
    </Switch>
    )
  }
}
