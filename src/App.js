import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Admin from './Views/Admin';
import Main from './Views/Main';
import Authentication from "./Components/Authentication"
import LoginPage from './Views/LoginPage';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
          
            <Route path="/admin" component={
              ()=>{
                return (
                  <Authentication redirect="/admin-login">
                    <Admin/>
                  </Authentication>
                )
              }
            }/>
          
            <Route exact path="/admin-login" component={LoginPage}/>
            <Route path="/" component={Main}/>
          </Switch>        
        </div>
      </Router>
    );
  }
}

export default App;
