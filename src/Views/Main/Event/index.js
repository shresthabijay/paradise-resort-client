import React, { Component } from 'react'
import {Switch,Route,Redirect} from "react-router-dom"
import EventPageMain from "./EventPageMain"
import Food from './RouteComponents/foods';
import Accomodation from './RouteComponents/accomodation';
import Place from './RouteComponents/places';
import Venu from './RouteComponents/venu';

export default class EventSection extends Component {
  render() {
    let matchPath=this.props.match.path
    return (
      <Switch>
        <Route exact path={`${matchPath}/`} component={EventPageMain}/>
        <Route path={`${matchPath}/foods`} component={Food}/> 
        <Route path={`${matchPath}/accommodation`} component={Accomodation}/>
        <Route path={`${matchPath}/places`} component={Place}/>
        <Route path={`${matchPath}/venu`} component={Venu}/>  
      </Switch>
    )
  }
}
