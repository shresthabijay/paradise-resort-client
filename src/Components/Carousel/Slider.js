import React, { Component } from 'react';
import {LeftArrow,RightArrow} from "./Arrow"
import Slide from "./Slide"
import Dots from "./Dot"
import bg1 from "../../assets/image1.jpg"
import bg2 from "../../assets/image2.jpg"
import bg3 from "../../assets/image3.jpg"



class Slider extends Component {
    constructor(props) {
       
        super(props);
      
        this.state={
            images:[bg1,bg2,bg3],
            currentIndex:0,
            changed:false
            
        }

        this.styles={
        
            width:"100%",
            overflow:"hidden",
            whiteSpace:"no-wrap",
            padding:"0",
            position:"relative",
         
        }

        this.wrapperStyle={
        
            width:"100%",
            display:"flex",
            flexDirection: "row",
            flex:"no-wrap",
            whiteSpace:"no-wrap",
            transition:"all 650ms "
        }
        
    }

    componentDidMount=()=>{
        
        this.updateDimensions()
        window.addEventListener("resize",this.updateDimensions)

        
            setInterval(()=>{
                
                this.goToNextSlide();
                
                   
                
            },6000)
        
    }

    renderSlides=()=>(
        this.state.images.map((img,key)=>
        <Slide key={key} image={img}/>
    ))
    
    goToNextSlide=()=>{
        this.props.change();
        if(this.state.currentIndex<this.state.images.length-1){
            this.setState(prevState=>{
                return {currentIndex:prevState.currentIndex+1}
            })
        }
        else{
            this.setState(prevState=>{
                return {currentIndex:0}
            })
        }  
         
    }

    componentWillUnmount(){
        window.removeEventListener("resize",this.updateDimensions)
    }

    goToPreviousSlide=()=>{
        if(this.state.currentIndex>0){
            this.setState(prevState=>{
                return {currentIndex:prevState.currentIndex-1}
            })
        }    
    }

    dotClickHandler=(index)=>{
        this.setState(()=>{
            return {currentIndex:index}
        })
    }

    updateDimensions=()=>{
        let h=document.querySelector(".slider").clientHeight
        let w=document.querySelector(".slider").clientWidth
        this.setState(prevState=>({height:h,width:w}))
        console.log(w)
    }

   

    render() {
       
        let {dotsVisible,arrowVisible} = this.props

        return (
            <div className="slider" style={this.styles}>
                <div className="slide-wrapper" style={{...this.wrapperStyle,transform:`translate(-${this.state.width*this.state.currentIndex}px,0)`}}>
                    {this.renderSlides()}
                </div>
                <Dots 
                    activeIndex={this.state.currentIndex} 
                    visible={dotsVisible}
                    clickHandler={this.dotClickHandler} 
                    images={this.state.images}
                />
                <LeftArrow goToPrevious={this.goToPreviousSlide} visible={arrowVisible}/>
                <RightArrow goToNext={this.goToNextSlide} visible={arrowVisible}/>
            </div>
        );
    }
}


export default Slider;