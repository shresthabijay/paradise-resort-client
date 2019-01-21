import React from 'react';
import {Link} from 'react-router-dom'
import room1 from '../../../../assets/room1.jpg'
import room2 from '../../../../assets/room2.jpg'
import room3 from '../../../../assets/room3.jpg'

import gridroom1 from '../../../../assets/grid-room1.jpg'
import gridroom2 from '../../../../assets/grid-room2.jpg'
import gridroom3 from '../../../../assets/grid-room3.jpeg'
import gridroom4 from '../../../../assets/grid-room4.jpeg'
import gridroom5 from '../../../../assets/grid-room5.jpeg'
import gridroom6 from '../../../../assets/grid-room6.jpeg'




class Accomodation extends React.Component{
    constructor(){
        super();
        this.state={

            room_img:[room1,room2,room3,
                gridroom1,
                gridroom2,
                gridroom3,
                gridroom4,
                gridroom5,
                gridroom6],
            title: "Affordable Luxury",
            description:"At Paradise, we make catering simple. You tell us what you like, and our celebrated chefs can whip up healthy and indulgent dishes for every palate. At Paradise, we make catering simple. You tell us what you like, and our celebrated chefs can whip up healthy and indulgent dishes for every palate."


        }

        window.scrollTo(0,0)
    }


    render(){
      return(

        <div className="stuff-grid">
        <div className="banner" id="accom-banner" >

        
        </div>
        <div className="container">
        <div className="row tabs ">
            <div className="col-sm-12 col-md-8 col-lg-3 tabs-menu">
                <ul>
                    <Link to="/events/foods" className="stuffs-menu "> Foods & Drinks</Link>
                    <Link to="/events/accommodation" className="stuffs-menu active "> Accomodation & Amenities</Link>
                    <Link to="/events/places" className="stuffs-menu"> Spaces & places </Link>
                    <Link to="/events/venu" className="stuffs-menu"> Venu Personaliser</Link>

                </ul>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-3">
            <h3 style={{textAlign:'center',marginTop:'10px'}}> {this.state.title}</h3>
            <img src={this.state.room_img[2]} alt="" style={{width:'100%'}}/>
            {/* <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur est consequatur minus nihil quidem quis blanditiis ducimus sit, voluptates deserunt beatae magnam vero cumque dolorum eos voluptate libero eum perferendis.</p> */}
            </div> 
            <div className="col-sm-12 col-md-12 col-lg-5" style={{margin :'40px 10px'}}>
        
            <p>{this.state.description}</p>
            </div>
        </div>
        </div>  
      
      {/* -------------------------------------------------------------------------------------------------- */}
      <div className="container main-grid">
        <h2 style={{textAlign:'center',fontFamily:'"Open Sans", sans-serif'}}>Explore Our Unique Offerings</h2>
        <div className="row mb-sm-3 mb-md-3 mb-lg-3">
        <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="custom-container">
        <img src={this.state.room_img[6]} alt="" style={{width:'100%'}}/>
        <div className="overlay">
        <div className="text">
            <h5><b>World Class Chefs</b></h5>
            <p > Our expert kitchen staff bring years of diverse culinary experience, adding excitement and creativity to dishes. We can ensure your event will be a delicious one. </p>
        </div>
        </div>
        </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4 ">
        <div className="custom-container" style={{margin:'15px 0px'}}>
        <img src={this.state.room_img[5]} alt="" style={{width:'100%'}}/>
        <div className="overlay">
        <div className="text">
            <h6><b>Foods Thoughtfully Sourced, Carefully Served</b></h6>
            <p>  We source healthy options from local communities to ensure a fresh and sustainable experience for all.  </p>
        </div>
       </div>
       </div>
       <div className="custom-container " style={{marginBottom:'15px'}}>
        <img src={this.state.room_img[3]} alt="" style={{width:'100%'}}/>
        <div className="overlay">
        <div className="text">
            <h6><b>Farm-to-Table Offerings</b></h6>
            <p>Many of our menus feature locally sourced ingredients, allowing your meeting attendees to experience the best regional flavors.</p>
        </div>
       </div>
       </div>
    </div>
        
        <div className="col-sm-12 col-md-12 col-lg-4">
        <div className="custom-container">
        <img src={this.state.room_img[7]} alt="" style={{width:'100%'}}/>
        <div className="overlay">
        <div className="text">
            <h6><b>Key Menu Offerings</b></h6>
            <p>We offer a range of food and beverage services — everything from buffets and individual meals to coffee and snacks — to help you create a seamless meeting experience from start to finish.</p>
        </div>
        </div>
        </div>
        </div>
     

        </div>

        <div className="row">

        <div className="col-sm-12 col-md-6 col-lg-8 ">
        <div className="custom-container" style={{margin:'15px 0px'}}>
        <img src={this.state.room_img[1]} alt="" style={{width:'100%'}}/> 
        <div className="overlay">
        <div className="text">
            <h6><b>Personal Preference Menus</b></h6>
            <p>Our Personal Preference Menus offer made-to-order meals for groups of any size.</p>
        </div>
        </div>
        </div>
        </div>

        <div className="col-sm-12 col-md-6 col-lg-4">
        <div className="custom-container" style={{marginBottom:'15px'}}>
        <img src={this.state.room_img[8]} alt="" style={{width:'100%'}}/>
        <div className="overlay">
        <div className="text">
            <h6><b>Seasonal Menus</b></h6>
            <p>We want your meeting attendees to enjoy the freshest food, so we update menus regularly to reflect the best each season has to offer.</p>
        </div>
        </div>
        </div>
        </div>

        </div>
    
        </div>

        <div className="quote">
            <p>“ When it comes to food and beverage, our approach is all about creating a social space that brings people together and offers incredible options. ”</p>
            <p>-Chef Manager, Hari Prasad</p>
        </div>
            
        </div>
    )

}
}

export default Accomodation;