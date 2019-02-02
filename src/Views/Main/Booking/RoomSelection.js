import React from 'react'
import single from '../../../assets/book_room-single.jpg'
import double from '../../../assets/book_room-double.jpg'
import suite from '../../../assets/book_room-suite.jpg'
import {getRoomTypeFromCategory,getRoomCategories} from "../../../Utils/apis"
// import { isNullOrUndefined } from 'util';

class RoomSelection extends React.Component{
    constructor(){
        super();

        this.state={
            roomData:null

        }
    }

    componentWillMount=async()=>{
        try{
            let {data:catgeoriesData}=await getRoomCategories()
            
            let roomData=[]

            for(let x=0;x<catgeoriesData.length;x++){

                try{
                    let {data:roomTypeData}=await getRoomTypeFromCategory({room_category_name:catgeoriesData[x].name})
                    let img_src=null

                    if(catgeoriesData[x].name==="Normal"){
                        img_src=single
                    }else if(catgeoriesData[x].name==="Deluxe"){
                        img_src=double
                    }
                    else{
                        img_src=suite
                    }

                    roomData.push({id:x,room_types:roomTypeData,img_src,name:catgeoriesData[x].name,selectedRoomType:roomTypeData[0]})

                }
                catch(err){

                }

                               
            }
          this.setState({roomData}) 
          this.props.afterSearchLoad()   
          this.props.setLoader(false) 
          
        }
        catch(err){

        }
    }

      handleRoomSelect=(e)=>{

            let roomCategory=e.target.id
            let roomData=[...this.state.roomData]

            for(let i=0;i<roomData.length;i++){
                if(roomData[i].name===roomCategory){
                   let s=roomData[i].selectedRoomType
                   this.props.addRoom(s.id,s.name,roomCategory,s.price_per_night,roomData[i].img_src)
                   return 
                }
            }


          
      }

      roomOptionChangeHandler=(e)=>{
            let roomType=e.target.value
            let roomCategory=e.target.id
            let roomData=[...this.state.roomData]
            for(let i=0;i<roomData.length;i++){
                if(roomData[i].name===roomCategory){
                    let room_types=roomData[i].room_types
                    for(let j=0;room_types.length;j++){
                        if(room_types[j].name===roomType){
                            roomData[i]={...this.state.roomData[i],selectedRoomType:room_types[j]}
                            this.setState({roomData})
                            return 
                        }
                    }
                }
            }
      }

    render(){
        return(
            this.state.roomData && 

            <div className="side">
                <div className="title">
                <h1>Choose your room.</h1>
                <h6>You get the best rates as there is no middleman: you are on the hotel website.</h6>
                </div>
                    <div className="rooms-category">
                        {this.state.roomData.map((data,i)=>{
                            return( <div className="card" style={{marginBottom:'20px'}} key={data.name}>
                            <div style={{backgroundColor:'#242424',color:'#fff',padding:'5px',textAlign:'center'}}><h3>{data.name}</h3></div>
                                <img src={data.img_src} className="card-img-top" alt="..." style={{width:'100%'}}/> 
                                <div className="mid-sec" style={{backgroundColor:'#f5f5f5',padding:'10px'}}>
                                <div className="row">
                                <div className="col-lg-10 col-sm-12 mb-sm-2 mb-xs-2">
                                   {/* <i className="material-icons" style={{fontSize:'20px'}}>compare</i> */}
                                <select className="custom-select" id={data.name} style={{width:'50%'}} onChange={this.roomOptionChangeHandler}>
                                    {data.room_types.map(d=>{
                                        return <option key={d.name} value={d.name}>{d.name}</option>
                                    })}
                                </select>
                   
                                </div>
                                {/* <div className="col-lg-2 col-sm-12 mb-sm-2 mb-xs-2">
                                <button className="btn btn-outline-secondary">See Details</button>
                                </div> */}
                                </div>
                                
                                </div>
                                   <div className="footer" style={{padding:'10px'}}>
                                   <div className="row">
                                   
                                   <div className="col-lg-10 recent" style={{color:'#000'}}>
                                   <h4 style={{color:'teal'}}>Available Rates</h4>
                                   <div className="row">
                                   <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                   <i className="material-icons" style={{fontSize:'20px',marginRight:'10px',display:"block",fontWeight:'bold'}}>close</i>
                                   <p style={{display:'inline-block',marginRight:'20px',color:'gray'}}>Breakfast Not Included</p>
                                   </div>
                                   <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                   <i className="material-icons"style={{fontSize:'20px',marginRight:'10px',display:"block",fontWeight:'bold'}}>check</i>
                                   <p style={{display:'inline-block',marginRight:'20px',color:'gray'}}>Cancellable,Modifiable</p>
                                   </div>
                                   <div className="col-xs-12 col-sm-12 col-md-4 col-lg-4">
                                   <i className="material-icons"style={{fontSize:'20px',marginRight:'10px',display:"block",fontWeight:'bold'}}>devices</i>
                                   <p style={{display:'inline-block',marginRight:'20px',color:'gray'}}>Payement</p>
                                   </div>
                                   </div>
                                   </div>
       
                                   <div className="col-lg-2 recent1">
                                   <h3>${this.state.roomData[i].selectedRoomType?this.state.roomData[i].selectedRoomType.price_per_night:""}</h3>
                                   <button className="btn btn-warning" id={data.name} onClick={this.handleRoomSelect}>Select</button>
                                   </div>
                                   </div>
       
                                   </div>
                               </div>)
                        })}
                    </div>
            </div>
            
        )
    }
}


export default RoomSelection;