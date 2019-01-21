import React,{Component}  from 'react';
import Ui from './eventUi'



class Event extends Component{

 
  
    render(){
        const {data}= this.props;
        const {image}= this.props;
        const{imageAlign}=this.props;
        const{contentAlign}=this.props;

        const{id}= this.props;


        return(
          
                <div id={`${id}`} style={{backgroundColor:'#f5f5f5',padding:'20px'}}>
                <div className="row">
                <div className={`col-lg-6 col-md-12 col-sm-12 ${imageAlign} event-image`}>
                    <img  src={image} alt="" style={{width:'100%',marginTop:'15px'}} className="responsive-img"/>

                </div>
             <div className={`col-lg-6 col-md-12 col-sm-12 ${contentAlign} event-data`}>
                 <Ui data={data}/>
              </div>
                </div>
                </div>
            
        );
    }
}

export default Event;