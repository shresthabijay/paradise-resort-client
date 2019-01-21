import React from 'react'
import Slider from './Carousel/Slider'



class MidSection extends React.Component{
  

  constructor(props){
      super(props);

      this.state={
          isExpanded:false,
          text:['From choosing the space to orchestrating the menu to incorporating personal touches—then making sure the event goes off without a hitch—a lot goes into ensuring your next meeting is a success. When you plan with Paradise, you can expect to find that, and more. Our award-winning and industry-leading Group Bill gives you a single, organized invoice so you can quickly and easily pay your bill. lorem    ',
                'Your priority is planning a successful meeting—and part of that is making sure guests enjoy their overall experience. Paradise offers a range of accommodations and amenities so your guests can make the most of their downtime. Use our Automated Diagramming & Collaboration tool to create the optimal room layout for your event.',
                'Book and plan a meeting anytime, anywhere with Meetings on Demand. Reserve your space and guestrooms, create your room layout, and set food options all on one convenient site. Automotive Distribution Network chose Paradise Resort, New Orleans for their educational expo and convention taking advantage of best-in-class event services over a 4 day period. '
        ],
          index:0
      }
  }
  handleToggle=()=>{
   
      this.setState({
          isExpanded: !this.state.isExpanded
      })
  }

  changeTextWithSlide=()=>{
    this.setState({
        index: this.state.index>=2?0:this.state.index+1,
        
    })
} 
  render(){

    
    return(
     <div>
     <div className="row " style={{padding:'20px'}}>
     <div className="col-sm-12 col-md-12 col-lg-6 " style={{marginTop:'40px'}}>
     <Slider change={this.changeTextWithSlide}/>
     </div>
     <div className="col-sm-12 col-md-12 col-lg-6  mid-div" style={{marginTop:'20px'}}>
     <h1 className="center" style={{fontWeight:'bold',fontFamily:'Lucida Console, Monaco, monospace',textAlign:'center'}}>Why Events and Seminars at Paradise?</h1>
       <p style={{fontFamily:'Dosis,sans-serif', fontSize:'22px',textAlign:'center'}}>{this.state.text[this.state.index]}</p> 

      <div className={this.state.isExpanded?"isExpanded": "panel"}>
      <h3 className="center">This is a collapsible Component</h3>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo perferendis officiis molestias cum debitis. Minus ea similique fugiat veritatis, natus cupiditate quo fuga, itaque qui asperiores non quos. Quidem, totam.</p>
      
      </div>
    <a style={{cursor:'pointer'}}><i className=" material-icons right" style={{fontSize:'50px'}} onClick={this.handleToggle}>{this.state.isExpanded?'arrow_drop_up':'arrow_drop_down'}</i></a>
     </div>
     </div>
     </div>

   
    
      
    );
}
}

export default MidSection;