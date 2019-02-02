import React, { Component } from 'react'
import {Switch,Route,Redirect} from "react-router-dom"
import {Home as HomeSection} from './Home';
import EventSection from './Event';
import BookingSection from './Booking';
import LocateSection from './LocateUs';
import Page404 from '../Page404';
import Footer from "../../Components/Footer"
import Nav from "../../Components/NavBar"
import '../../Static/style.css'
import {connect} from "react-redux"
import {setMenuDisplay,toggleMenuDisplay as toggle} from "../../Actions/navActions"


class Main extends Component {
  constructor(props){
    super(props);
    this.handleContainerClick = this.handleContainerClick.bind(this)
    this.whenScrolled=this.whenScrolled.bind(this)
  }

  componentDidMount(){
    
    if(window.innerWidth >= 768){
      this.setState({menuDisplay:'true'});
    }else{
      this.setState({menuDisplay: 'false'})
    }
    window.addEventListener('scroll', this.whenScrolled);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.whenScrolled);
  }

  whenScrolled(){
    if(window.scrollY> 50 && this.props.navState.menuDisplay === 'true'){
      this.props.toggleMenuDisplay()
   }
   if(window.scrollY===0 && this.props.navState.menuDisplay === 'false'){
    this.props.toggleMenuDisplay()
 }
  }

  handleContainerClick(){
    if(this.props.navState.menuDisplay === 'true'){
      this.props.setMenuDisplay("false");
    }
  }

  render() {
    const move = (this.props.navState.menuDisplay === 'true')? " moveDown " : "";
    const linkObj = [{url:'/home',name:'Home'},{url:'/booking',name:'Booking'},{url:'/events',name:'Events'},{url:'/Locate-us',name:'Locate Us'}]
    return (
      <div>
          <Nav 
            linkObj={linkObj}
          />
          <div className= {"body "+move} onClick={this.handleContainerClick} >
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
      </div>
    )
  }
}

const mapStateToProps=({navState})=>{
  return {navState}
}

const disptachToProps=(dispatch)=>{
  return {
      toggleMenuDisplay:()=>{
          dispatch(toggle())
      },
      setMenuDisplay:(menuDisplay)=>{
        dispatch(setMenuDisplay(menuDisplay))
      }
  }
}

export default connect(mapStateToProps,disptachToProps)(Main)


