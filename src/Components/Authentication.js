import React, { Component } from 'react'
import {Redirect} from "react-router"
import {isAuthenticated} from "../Utils/adminAuthentication"

export default class Authentication extends Component {


  render() {
      if(isAuthenticated()){
          return this.props.children
      }
      else{
          return <Redirect to={this.props.redirect}/>
      }
  }
}




