import React, { Component } from 'react'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators
} from 'reactstrap';
import {TimelineMax} from 'gsap/all'
import './slideshowStyle.css'

export default class SlideShow extends Component{
    constructor (props){
        super(props);
        this.state = { activeIndex: 0 ,inactive:2,dir:'next'};
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.goToIndex = this.goToIndex.bind(this);
        this.onExiting = this.onExiting.bind(this);
        this.onExited = this.onExited.bind(this);
    
        this.animatables = {active: [null,null],inactive:[null,null]}
        this.playDescChangeTween1 = this.playDescChangeTween1.bind(this);

    }
    componentDidMount(){
        this.playDescChangeTween1()
    }
    playDescChangeTween1(){
        const tl = new TimelineMax({paused:true})
            .fromTo(this.animatables.active, 1, {autoAlpha:0,display:'none'},{autoAlpha:1,display:'block'} )
            .fromTo(this.animatables.inactive, 0, {autoAlpha:1,display:'block'},{autoAlpha:0,display:'none'},'-=0.75' )
        
            tl.play();
    }
    onExiting() {
        this.animating = true;
        this.playDescChangeTween1();
    }
    onExited() {
        this.animating = false;
    }
    
    next(){
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === this.props.images.length - 1 ? 0 : this.state.activeIndex + 1;
        this.setState({inactive: this.state.activeIndex, activeIndex: nextIndex, dir:'next'});
    }
    
    previous() {
        if (this.animating) return;
        const nextIndex = this.state.activeIndex === 0 ? this.props.images.length - 1 : this.state.activeIndex - 1;
        this.setState({inactive:this.state.activeIndex , activeIndex: nextIndex ,dir:'prev'});
    }
    
    goToIndex(newIndex) {
        if (this.animating || this.state.activeIndex===newIndex) return;
        const newdir =(this.state.activeIndex>newIndex)?'prev':'next';
        this.setState({inactive:this.state.activeIndex, activeIndex: newIndex , dir: newdir});
    }
    render(){
        const {activeIndex} = this.state;
        const slides = this.props.images.map((image) => {
        return (
            <CarouselItem
                onExiting={this.onExiting}
                onExited={this.onExited}
                key={image.src}
            >
                <div className='carousel-image' style={{backgroundImage:'url(' + image + ')'}}/>
            </CarouselItem>
        );
        });
        return(
            <div className='container-fluid p-0 slideshow' style={{}}>
                <div className='row'>
                    <div className={`col-md-8 col-xs-12 component-p1 ${  window.innerWidth >= 768? (this.props.right? 'order-last':'order-first') : " "}`} style={{}}>
                        <Carousel
                            activeIndex={activeIndex}
                            next={this.next}
                            previous={this.previous}
                        >
                        <CarouselIndicators items={this.props.images} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                            {slides}
                        <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                        <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
                        </Carousel>
                    </div>
                    <div className={`col-md-4 col-xs-12 component-p2 ${window.innerWidth >= 768? (this.props.right? 'order-first':'order-last') : " "}`}>
                            <div className="">
                                <div className="component-name">
                                    {this.props.componentDesc.component}
                                </div>
                                <div className='component-desc'>
                                    {this.props.componentDesc.description}
                                </div>
                                <div className='slide-desc'>
                                        {
                                        (this.state.dir === 'next')?
                                        <div className="rel">
                                            <div className='room-type abs' ref={div=>this.animatables.active[0]=div}>
                                                {this.props.imageDesc[this.state.activeIndex].name}
                                            </div>
                                            <div className='room-type abs' ref={div=>this.animatables.inactive[0]=div}>
                                                {this.props.imageDesc[this.state.inactive].name}
                                            </div>
                                        </div>
                                        :
                                        <div className="rel">
                                            <div className='room-type abs' ref={div=>this.animatables.inactive[0]=div}>
                                                {this.props.imageDesc[this.state.inactive].name}
                                            </div>
                                            <div className='room-type abs' ref={div=>this.animatables.active[0]=div}>
                                                {this.props.imageDesc[this.state.activeIndex].name}
                                            </div>
                                        </div>
                                        }
                                        {
                                        (this.state.dir==='next')? 
                                        <div className="room-desc rel">
                                            <div className='room-desc abs' ref={div=>this.animatables.active[1]=div}>
                                                {this.props.imageDesc[this.state.activeIndex].desc}
                                            </div>
                                            <div className='room-desc abs' ref={div=>this.animatables.inactive[1]=div}>
                                                {this.props.imageDesc[this.state.inactive].desc}
                                            </div>
                                        </div>
                                        :
                                        <div className="room-desc rel">
                                            <div className='room-desc abs' ref={div=>this.animatables.inactive[1]=div}>
                                                {this.props.imageDesc[this.state.inactive].desc}
                                            </div>
                                            <div className='room-desc abs' ref={div=>this.animatables.active[1]=div}>
                                                {this.props.imageDesc[this.state.activeIndex].desc}
                                            </div>
                                        </div>
                                        }
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}