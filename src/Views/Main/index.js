import React, { Component } from 'react'
import {Switch,Route,Redirect} from "react-router-dom"
import HomeSection from './Home';
import EventSection from './Event';
import BookingSection from './Booking';
import LocateSection from './LocateUs';
import Page404 from '../Page404';
import Footer from "../../Components/Footer"


export default class Main extends Component {
  render() {
    return (
      <div>
          <Switch>
            <Route exact path="/" component={()=>{
              return <Redirect to="/home"/>
            }}/>
            <Route  path="/home" component={HomeSection}/>
            <Route  path="/events" component={EventSection}/>
            <Route  path="/booking" component={BookingSection}/>
            <Route  path="/locateus" component={LocateSection}/>
            <Route path="*" component={Page404}/>
          </Switch>
          <Footer/>      
      </div>
    )
  }
}
