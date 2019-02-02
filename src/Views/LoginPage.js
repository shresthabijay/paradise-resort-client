import React, { Component } from 'react'
import {storeToken,isAuthenticated} from "../Utils/adminAuthentication"
import {Redirect} from "react-router-dom"
import axios from "axios"
import {adminLogin} from "../Utils/apis"
import bg from '../assets/butta.png'
export default class LoginPage extends Component {

  state={error:false,username:"",password:"",redirectToAdmin:false}
  
  login = async ()=>{
    try{
      let res=await adminLogin({username:this.state.username,password:this.state.password})
      storeToken(res.data.token)
      axios.defaults.headers.common["x-access-token"]=res.data.token
      this.setState({redirectToAdmin:true})
    }
    catch(err){
      this.setState({error:true,username:"",password:"",redirectToAdmin:false})
    }
  }

  componentDidMount=()=>{
    if(isAuthenticated()){
      this.setState({redirectToAdmin:true})
    }
  }

  onChange=(e)=>{
    this.setState({
      [e.target.name]:e.target.value
    })
  }
  
  render() {
    if(this.state.redirectToAdmin){
      return <Redirect to="/admin"/>
    }
    return (
      <div className="login-main conatiner-fluid" style={{backgroundImage:{bg}}}>
        <div className="row d-flex justify-content-center align-items-center" style={{height:"100%",margin:"0",padding:"25px"}}>
          <div className="card z-index-l col-lg-3 col-md-4 col-sm-8 login-portal">
            <div className="login-header p-2">Login</div>
            <div className="">
              <form  className="p-4" onScroll={()=>{}}>
                  <div className="form-group">
                    <label>Username:</label>
                    <input type="text" name="username" value={this.state.username} className="form-control" placeholder="Enter Name" onChange={this.onChange} />
                  </div>
            
                  <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={this.state.password} className="form-control" placeholder="Enter password" onChange={this.onChange} />
                  </div> 
                  <div style={{textAlign:"center"}}>{this.state.error && <small className="text-danger">* credentials are incorrect</small>}</div>       
              </form>
              <hr className="adminHr"/>
              <div className="mb-2">                  
                    <div className="d-flex justify-content-center">
                      <button  className="btn btn-info" onClick={this.login}>
                        Login
                      </button>
                    </div>
              </div>
            </div>
            </div>
          </div>
        </div>
    )
  }
}