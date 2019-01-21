import React, { Component } from 'react'
import BookingSection from "./BookingSection"
import {Switch,Route} from "react-router-dom"
import PayementSection from './PayementSection';
export default class Booking extends Component {
  render() {
    let matchPath=this.props.match.path
    return (
    <Switch>
      <Route exact path={`${matchPath}/`} component={BookingSection}/>
      <Route path={`${matchPath}/payment`} component={PayementSection}/>      
    </Switch>
    )
  }
}
