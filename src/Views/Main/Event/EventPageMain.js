import React from 'react';
import MidBar from '../../../Components/midbar';
import Event from '../../../Components/event.js'
import MidSection from '../../../Components/MidSection'
import ImageGrid from '../../../Components/ImageGrid'

import img5 from '../../../assets/image5.jpg'
import img6 from '../../../assets/image6.jpg'
import img7 from '../../../assets/image7.jpg'
import img8 from '../../../assets/image8.jpg'
import img9 from '../../../assets/image9.jpg'

import food1 from '../../../assets/food1.jpg'
import food2 from '../../../assets/food2.jpg'
import food3 from '../../../assets/food3.jpg'

import place1 from '../../../assets/place1.jpg'
import place2 from '../../../assets/place2.jpg'
import place3 from '../../../assets/place3.jpg'

import room1 from '../../../assets/room1.jpg'
import room2 from '../../../assets/room2.jpg'
import room3 from '../../../assets/room3.jpg'




class Design extends React.Component{
    constructor(){
        super();
        this.state={
            classforheader:'',
            images:[img5,img6,img7,img8,img9,food1,food2,food3,room1,room2,room3,place1,place2,place3],
            newGrid:[],
        }
    }
    componentWillMount(){
        window.addEventListener("scroll",()=>{
            if(window.scrollY === 0){
                this.setState({
                    classforheader:'custom'
                })

            }else if(window.scrollY>0){
                this.setState({
                    classforheader:'custom1'
                })
            }
        });
       
    }
    componentDidMount(){
    
       let grid= this.state.images.filter((img,i,arr)=>{
         return i>4? true : false
        
        })
  
    this.setState({
        newGrid: grid
    })
  
}

    render(){
        let data=[{"id":1,"Event_name":"Wedding","description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.","image_url":null},{"id":2,"Event_name":"Meetings and Dinners","description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.","image_url":null},{"id":3,"Event_name":"Social Event","description":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.","image_url":null}]
    
    return(
        <div>
         
          <div className="full-wrapper">
        <div className={`bg-wrapper ${this.state.classforheader}`}>
        <h1>Introducing Meetings On Demand</h1>
        </div>
        </div> 
        
              <MidBar/>
              <MidSection/>
              <div className="quote" style={{backgroundColor:'#424242',padding:'7px'}}>
               
            <p className="lead" style={{color:'#fff',textAlign:'center'}}>“ You'll find authentic service and superior facilities that cater to business travelers, leisure guests, and groups of all sizes. ”</p>
               
              </div>
              <div id="box1" className="box1 "></div>

               <ImageGrid images={this.state.newGrid}/> 

               <div className="banner-event" style={{margin:"20px"}}>
              
               <h1 style={{fontFamily:"Charm,cursive",textAlign:'center',color:'teal'}}> <i className="material-icons teal-text ">filter_vintage</i>Our Events & Happenings<i className="material-icons teal-text ">filter_vintage</i></h1>
               </div>

               
                <Event data={data[0]} image={this.state.images[0]} id="wedding"/>
                <hr className='my-4'/>
                {/* <div id="box2" className="box2 "></div> */}
                <Event data={data[1]} image={this.state.images[1]} id="meetings" imageAlign="order-last" contentAlign="order-first"/>
                <hr className='my-4'/>

                {/* <div id="box3" className="box3 "></div> */}
                <Event data={data[2]} image={this.state.images[2]} id="social-events"/>       
                
        </div>
        
    );
}
}

export default Design;