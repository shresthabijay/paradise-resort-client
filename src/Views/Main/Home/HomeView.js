import React, { Component } from 'react'
import SlideShow from "../../../Components/SlideShow"
import Slider from "../../../Components/Slider"
import './homeStyle.css'
import Bookbar from '../Booking/Bookbar'

const ssr1= require('../../../assets/ssr1.jpg');
const ssr2= require('../../../assets/ssr2.jpg');
const ssr3= require('../../../assets/ssr3.jpg');
const ssf1= require('../../../assets/sushi.jpg');
const ssf2= require('../../../assets/momo.jpg');
const ssf3= require('../../../assets/chefs.jpg');

const roomDesc = [
    {
        name:"Normal",
        desc:'A normal budget friendly room.',
    },
    {
        name:"Deluxe",
        desc:'Fancy large deluxe room.',
    },

    {
        name:"Suite",
        desc:'Cozy room for the best experience.',
    },
 ]
 const foodDesc = [
  {
      name:"Normal",
      desc:'Select any meal from the menu.',
  },
  {
      name:"Special",
      desc:'Tasty Nepali local tradition food.',
  },

  {
      name:"Order Anytime",
      desc:'You can order anytime you like.',
  },
]
const componentDescFood= {
  component: "Delicious Food",
  description:"Order varieties of food made by expert chefs, including nepali foods."
}
const componentDescRooms= {
  component: "Luxurious Rooms",
  description:"Choose exactly the type of room you need from our wide sets of rooms."
}
export default class HomeView extends Component {
  componentDidMount(){
  }  
  render() {
    return (
      <div className='butta p-0' style={{overflow:'hidden',maxWidth:'100vw'}}>
        <div>
          <Slider/>
        </div>
        <div style={{background:'#2d302f'}}>
          <Bookbar/>
        </div>
        <div className='container  p-0'> 
          <div  style={{marginTop: '100px',marginBottom: '50px'}}> 
            <SlideShow slidingOffset={0}  right={false} imageDesc={roomDesc} componentDesc={componentDescRooms} images={[ssr1,ssr2,ssr3]}/>
          </div>
          <div style={{marginTop: '100px',marginBottom:'100px'}}>
            <SlideShow slidingOffset={1000} right={true} imageDesc={foodDesc} componentDesc={componentDescFood} images={[ssf1,ssf2,ssf3]}/>
          </div>
        </div>
      </div>
      )
  }
}