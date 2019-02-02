import React,{Component} from 'react'
import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators
} from 'reactstrap';

import {TimelineMax} from 'gsap/all';

import './sliderStyle.css'

const desc = [
    "Please bring me my wine.",
    "We haven't had that spirit here since 1969",
    "You can checkout anytime you like. But you can never leave",
]

const items = [
{
    src: 'i1',
    altText: 'Slide 1',
    caption: 'Slide 1'
},
{
    src: 'i2',
    altText: 'Slide 2',
    caption: 'Slide 2'
},
{
    src: 'i3',
    altText: 'Slide 3',
    caption: 'Slide 3'
},
];
class Slider extends Component {
constructor(props) {
    super(props);
    this.state = { activeIndex: 0 ,inactive:0,dir:'next'};
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);

    this.desc = {active:null,inactive:null};
    this.playDescChangeTween1 = this.playDescChangeTween1.bind(this);
}
componentDidMount(){
    this.playDescChangeTween1()
}
playDescChangeTween1(){
    const down = (this.state.dir === 'next')? true:false;
    const yMinus = '-40px';
    const yPlus = '40px';
    const tl = new TimelineMax({paused:true})
        .fromTo(this.desc.active, 0.75, {autoAlpha:0, top: down?yMinus:yPlus,display:'none'},{autoAlpha:1, top:'0',display:'block'} )
        .fromTo(this.desc.inactive, 0.75, {autoAlpha:1,top:'0',display:'block'},{autoAlpha:0,top:'0',display:'none'},'-=0.75' )
        
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
    const nextIndex = this.state.activeIndex === items.length - 1 ? 0 : this.state.activeIndex + 1;
    this.setState({inactive: this.state.activeIndex, activeIndex: nextIndex, dir:'next'});
}

previous() {
    if (this.animating) return;
    const nextIndex = this.state.activeIndex === 0 ? items.length - 1 : this.state.activeIndex - 1;
    this.setState({inactive:this.state.activeIndex , activeIndex: nextIndex ,dir:'prev'});
}

goToIndex(newIndex) {
    if (this.animating || this.state.activeIndex===newIndex) return;
    const newdir =(this.state.activeIndex>newIndex)?'prev':'next';
    this.setState({inactive:this.state.activeIndex, activeIndex: newIndex , dir: newdir});
}
render() {
    const { activeIndex } = this.state;
    const slides = items.map((item) => {
    return (
        <CarouselItem
        onExiting={this.onExiting}
        onExited={this.onExited}
        key={item.src}
        >
            <div className={'carousel-image vh-80 '+item.src} />
        </CarouselItem>
    );
    });

    return (
    <div className='slider'>
        <div className="caro">    
            <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
                    {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
            </Carousel>
        </div>
        <div className='carousel-overlay' >
             {
                (this.state.dir === 'next')? 
                <div className='desc'>
                    <div className={`wrap`} ref={(div)=>this.desc.inactive=div}>
                        {desc[this.state.inactive] }
                    </div>
                    <div className={`wrap`} ref={(div)=>this.desc.active=div}>
                        {desc[this.state.activeIndex]}
                    </div>
                </div>
            :
                <div className='desc'>
                    <div className={`wrap`} ref={(div)=>this.desc.active=div}>
                        {desc[this.state.activeIndex]}
                    </div>
                    <div className={`wrap`} ref={(div)=>this.desc.inactive=div}>
                        {desc[this.state.inactive]}
                    </div>
                </div>
            }
            <div className="paradise-resort">
                <div className="paradise">Paradise</div>
                <div className="resort">Resort</div>
            </div>
            </div>
    </div>
    );
}
}
export default Slider;