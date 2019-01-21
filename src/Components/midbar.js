import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import { HashLink as Link } from 'react-router-hash-link';

const MidBar=()=>{
  
    return(
       
        <Router>
    <div className="tab-name" style={{zIndex:'1', backgroundColor:'rgb(66, 66, 66)'}}> 
   
         <li><Link smooth to="#wedding" className="a" >Wedding</Link> </li> 
         <li><Link smooth to="#social-events" className="a">Social Events</Link></li> 
         <li><Link smooth to="#meetings" className="a">Meetings</Link></li> 
         <li><Link smooth to="#special-events" className="a">Special Events</Link>
         <span className="badge badge-danger">New</span>
         </li>
        
    </div>
    </Router>
   
    

    );
}

export default MidBar;