import React, { Component } from 'react'
import {Switch,Route,Redirect} from "react-router-dom"
import HomeSection from './Home';
import EventSection from './Event';
import BookingSection from './Booking';
import LocateSection from './LocateUs';
import Page404 from '../Page404';


export default class Main extends Component {
  render() {
    return (
      <div>
          <Switch>
            <Route exact path="/" component={()=>{
              return <Redirect to="/home"/>
            }}/>
            <Route exact path="/home" component={HomeSection}/>
            <Route exact path="/events" component={EventSection}/>
            <Route exact path="/booking" component={BookingSection}/>
            <Route exact path="/locateus" component={LocateSection}/>
            <Route path="*" component={Page404}/>
          </Switch>
      </div>
    )
  }
}
