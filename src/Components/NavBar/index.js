import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from "react-redux"
import './navStyle.css'
import {toggleMenuDisplay as toggle} from "../../Actions/navActions"

const makeLinks = (linkObj,animateList,toggleMenuDisplay)=>{
  let ret = [],
      i
  for(i=0;i<linkObj.length;i++){
    let li = <li className={animateList(i+1)} key={i}>
                <NavLink to={linkObj[i].url} className='navyItems' activeClassName='linkActive' onClick={()=>{toggleMenuDisplay()}}><div> <span>{linkObj[i].name}</span></div></NavLink>
            </li>
    ret.push(li);
  }
  return ret
}
class NavBar extends React.Component{ 
    

    
    render(){

        let menuDisplay=this.props.navState.menuDisplay;
        let moreMenuClass= (menuDisplay.toString() === 'true')? 'menuActive ':' ';
        let moreButtonClass= (menuDisplay.toString() === 'true')? 'hamBurgerActive ': '';
        let animateOne = (menuDisplay.toString() === 'true')? 'animate1':'';
        let animateTwo = (menuDisplay.toString() === 'true')? 'animate2':'';
        let animateThree = (menuDisplay.toString() === 'true')? 'animate3':'';
        
        let animateList=(n)=>(menuDisplay.toString() === 'true')? 'activea delay'+n.toString():'';
        
        return(
            <div className={'menua '+ moreMenuClass} id='mu'>
                <div className={'hamBurger ' + moreButtonClass} id='ham' onClick={()=>{this.props.toggleMenuDisplay()}}>
                     <div className={animateOne} id='one'></div>
                    <div className={animateTwo} id='two'></div>
                    <div className={animateThree} id='three'></div>
                </div>
                <nav>
                    <ul>
                        {
                          makeLinks(this.props.linkObj,animateList,this.props.toggleMenuDisplay)
                        }
                    </ul> 
                </nav>
            </div>
        );
    }
}

const mapStateToProps=({navState})=>{
    return {navState}
}

const disptachToProps=(dispatch)=>{
    return {
        toggleMenuDisplay:()=>{
            dispatch(toggle())
        }
    }
}

export default connect(mapStateToProps,disptachToProps)(NavBar)

