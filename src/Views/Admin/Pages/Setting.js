import React,{Component} from "react"
import {Switch,Redirect,Route} from "react-router-dom"
import {logout} from "../../../Utils/adminAuthentication"

class User extends Component {

    logout=()=>{
        logout()
        this.props.history.push("/admin-login")
    }

    render(){
      return (
        <div>
          <div className="adminPageHeader">User</div>
          <div className="adminPageMain">
              <div className="">
                <div className="adminSubHeader"><i className="fas fa-bed adminSubIcon"></i>Logout</div>
                <hr className="adminHr"/>
                <br/>
                <button type="button" onClick={this.logout} className="btn btn-info adminButton ml-3"><i className="fas fa-plus pr-2"></i>Logout</button>
              </div>
          </div>
        </div>
      )
    }
  }
  
  export default class Setting extends Component {
    render() {
      let matchPath=this.props.match.path
      return (
          <Switch>
            <Route path={`${matchPath}/user`} component={User}/>
            <Route exact path={`${matchPath}/`} component={()=>{
              return <Redirect to={`${matchPath}/user`}/>
            }}/>
          </Switch>
      )
    }
  }