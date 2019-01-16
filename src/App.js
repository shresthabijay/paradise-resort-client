import React, { Component } from 'react';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom"
import Admin from './Views/Admin';
import Main from './Views/Main';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/admin" component={Admin}/>
            <Route path="/" component={Main}/>
          </Switch>        
        </div>
      </Router>
    );
  }
}

export default App;
