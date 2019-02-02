import React from 'react';
import DatePicker from "react-datepicker";
import RoomSelection from './RoomSelection';
import moment from "moment"
import {checkRoomTypeAvailabilty} from "../../../Utils/apis"


class BookingSection extends React.Component{
    constructor(){
        super();

        this.bookbarRef=React.createRef()

        window.scrollTo(0,0)
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        this.state={
            checkIn:new Date(),
            checkOut:tomorrow,
            no_of_rooms:1,
            // isdisabled:false,
            searching:null,
            price:0,
            add:false,
            removeanimation:null,
            addanimation:null,
            showRoomSelection:false,
            room_type:
                {
                    id:null,
                    category:null,
                    name:null,
                    price:0,
                    img_src:null,
                    error:null,
                    isdisabled:true
                }
         
        }
    
    }

    addRoom=async (id,name,category,price,img_src)=>{
         
            this.setState({
                add:true,
                addanimation:true,
               room_type:{
                   isdisabled:true
               }
                
           
            })
            
            try{
                let res=await checkRoomTypeAvailabilty({room_type_id:id})

                this.setState({addanimation:false,
                    room_type:
                    {
                        id:id,
                        category:category,
                        name:name,
                        price:price,
                        img_src:img_src,
                        removeanimation:false,
                        isdisabled:false,
                        detail:{message:"Available",err:false}  
                    }
                })
  
            }
            catch(err){

                this.setState({addanimation:false,
                    room_type:
                    {
                        id:id,
                        category:category,
                        name:name,
                        price:price,
                        img_src:img_src,
                        removeanimation:false,
                        isdisabled:true,
                        detail:{message:"Room N/A",err:true}  
                    }
                })

            }   
    }

    
    afterSearchLoad=()=>{
        window.scrollTo(0,this.bookbarRef.current.offsetTop)
    }

    removeRoom=()=>{
        this.setState({
            removeanimation:true,
            room_type:{
                isdisabled:false
            }
            
        })
        setTimeout(()=>{
            this.setState({removeanimation:false,add:false,addanimation:false,
                room_type:
                {
                    id:null,
                    category:null,
                    name:null,
                    price:0,
                    img_src:null,
                    isdisabled:true

                }
            })
            
        },500)
    }
    onHandleChange=(e)=>{
        this.setState({
            [e.target.id]:e.target.value
        })
    }

      handleSelectIn=(date)=>{
          this.setState({
              checkIn:date,
          })
      }

      handleSelectOut=(date)=>{
        this.setState({
            checkOut:date,
        })
       }

 

       search=()=>
       {

            this.setState({
                searching:true
            })

       }

       setLoader=(flag)=>{
            this.setState({searching:false,showRoomSelection:true,searchDisable:true})
       }

   
       
       
       dateValidation=(dateIn,dateOut)=>{
         
           var d= new Date();
           console.log('valid',dateOut.getDate())
           if(dateIn.getDate()<d.getDate()){
            this.setState({
                checkIn:d,
             
            })

        }
            if(dateIn.getYear()===dateOut.getYear() && dateIn.getMonth()===dateOut.getMonth()){
              
                if(dateIn.getDate()>=dateOut.getDate() || dateIn.getMonth()>dateOut.getMonth()){
                 
                    return true;
                }else{
                    return false;
                }
            
            }
            else if(dateIn.getMonth()>dateOut.getMonth()|| dateIn.getYear()>dateOut.getYear()){
             
                return true;
              
            }else{
                return false;
            }
       }

    
    componentWillMount(){
     
        if(this.props.location.state!==null){
        this.setState({
            ...this.props.location.state
        })
        }
        else{

        }
    
    }

    onproceed=()=>{
        let bookdata={
            date_check_in:moment(this.state.checkIn).utc().format("YYYY-MM-DD HH:mm:ss"),
            date_check_out:moment(this.state.checkOut).utc().format("YYYY-MM-DD HH:mm:ss"),
            room_id:this.state.room_type.id,
            price_per_night:this.state.room_type.price
        }
        
        this.props.history.push('/booking/payment',{bookData:bookdata,id:"payment"})

    }
   
    render(){
        

        const spinner= this.state.searching ?( 
            <div className="d-flex justify-content-center"> 
                <div className="spinner-grow text-center" role="status">
            <span className="sr-only">Loading...</span>
           </div>
           </div>
           
        ):''

        
        const spinner1=  this.state.addanimation||this.state.removeanimation?( 
            <div className="d-flex justify-content-center"> 
                <div className="spinner-grow text-center" role="status">
            <span className="sr-only">Loading...</span>
           </div>
           </div>
           
        ):''
        return(
            
            <div className="">
                <div className="wrapper" style={{height:"80vh"}}>
                </div>

                <div className="pannel-bar" ref={this.bookbarRef}>

                <div className="row item">
                <div className=" col-sm-12 col-md-12 col-lg-3 mb-md-2 mr-lg-2 mb-sm-3">
                <label className="customs" >Check-In</label>

                <DatePicker
                className="form-control"
                selected={this.state.checkIn}
                onChange={this.handleSelectIn}
                showTimeSelect={true}
                dateFormat="MMM d, yyyy h:mm aa"
                />
                
                 <i className="material-icons">date_range</i>
             </div>

            
            <div className="col-sm-12 col-md-12 col-lg-3 mb-md-2 mr-lg-2 mb-sm-3">
                <label className="customs">Check-Out</label>
                <DatePicker
                
                className="form-control"              
                selected={this.state.checkOut}
                onChange={this.handleSelectOut}
                showTimeSelect={true}
                dateFormat="MMM d, yyyy h:mm aa"
                />
        
                 <i className="material-icons">date_range</i>
                </div>

            <div className="col-sm-12  col-md-12 col-lg-2 mb-md-2 mr-lg-2 mb-sm-3">
            <label >Adults</label>

            
           
            <select className="custom-select" id="adults" onChange={this.onHandleChange} value={this.state.adults}>
            
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            
            </select>

            </div>
            <div className="col-sm-12 col-md-12 col-lg-2">
            <label >Children</label>
            <select className="custom-select" id="children" onChange={this.onHandleChange} value={this.state.children}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
            
            </div>
            

            <div className="col-sm-12 col-md-12 col-lg-1">
            <label >No_Room</label>
            <select className="custom-select" id="no_of_rooms" onChange={this.onHandleChange} placeholder="No..">
            {/* <option >{this.state.children}</option> */}
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
            
            </div>


            </div>
            <div className="error-field">
        
             <button disabled={this.dateValidation(this.state.checkIn,this.state.checkOut) || this.state.searchDisable } type="button" className="btn btn-secondary btn-block" onClick={this.search}>Search</button>  

                {this.dateValidation(this.state.checkIn,this.state.checkOut) &&  <p style={{color:'red',margin:'10px'}}>Invalid CheckIn and CheckOut Time</p>}

             </div>
                </div>

                <div className="container selection-pannel ">
                {spinner}
                <div className="row">
               

                 {this.state.searching===false && 
                
                <div className="col-sm-12 col-lg-3 order-last ">
               
                <div className=" details1" >
                {spinner1}
                <div className="card-body">
                    <h5 className="card-title">
                    Total: ${this.state.room_type.price}
                    </h5>
                    <hr/>

                    <p style={{fontSize:'14px',color:this.state.room_type.detail?this.state.room_type.detail.err?"red":"green":""}}>Details:
                        &nbsp; {this.state.room_type.detail && this.state.room_type.detail.message}
                    </p>
                    <hr className="my-1"/>
                   {this.state.add===false && <p className="card-text" style={{textAlign:'center',fontSize:'25px'}}>Select Room Category!</p>}

                {this.state.add===true && 
                        <div className="row">
                        <div className="col-12">
                        <img src={this.state.room_type.img_src} alt="" style={{width:'100%'}}/>
                        </div>
                        <div className="col-12" style={{padding:'10px'}}>
                            <h3 style={{color:'teal',fontFamily:'bold'}}>{this.state.room_type.category}</h3>
                            <h6>Type: {this.state.room_type.name}</h6>                
                            <h4>Price: ${this.state.room_type.price}</h4>
                             <p>Check-In: {this.state.checkIn.toLocaleDateString()}</p>
                            <p>Check-Out: {this.state.checkOut.toLocaleDateString()}</p> 
                        </div>
                    </div>
                }
                    <div className="row">
                    <div className="col-lg-6">
                    <button className="btn btn-danger" onClick={this.removeRoom}>Remove</button>
                    </div>
                    <div className="col-lg-6">
                    <button disabled={this.state.room_type.isdisabled || this.dateValidation(this.state.checkIn,this.state.checkOut) || this.state.room_type.error } onClick={this.onproceed} className="btn btn-outline-success">Proceed</button>

                    </div>
                    {this.dateValidation(this.state.checkIn,this.state.checkOut) && <p style={{color:'red',textAlign:'center'}}>Please correct the date of arrival and departure </p>}
                    </div>
                </div>
                </div>
               
                </div>}

                {(this.state.showRoomSelection || this.state.searching) && 
                    <div className="col-sm-12 col-lg-9 order-first">
                        <RoomSelection afterSearchLoad={this.afterSearchLoad} setLoader={this.setLoader} addRoom={this.addRoom}/>
                    </div>
                }
                    
                    </div>
                </div>
              {this.state.searching===false && <div className="mini-details ">
                        <div className="row">
                        <div className="col-8 " >
                        <div className="main-details" style={{paddingLeft:'25px'}}>
                        <div className="flex1" >
                            <p style={{color:"#fff"}}>Total: </p>
                            <p>${this.state.room_type.price}</p>
                        </div>
                        <div className="flex1">
                            <p style={{color:"#fff"}}>Type: </p>
                            <p>{this.state.room_type.name}</p>
                            </div>
                        <div className="flex1">
                            <p style={{color:"#fff"}}>Details</p>
                            <p style={{fontSize:'14px',color:this.state.room_type.detail?this.state.room_type.detail.err?"red":"green":""}}
                            >{this.state.room_type.detail && this.state.room_type.detail.message}
                            </p>
                        </div>
                        
                        </div>
                        </div>
                        <div className="col-4" style={{paddingTop:'8px'}}>
                                <button disabled={this.state.room_type.isdisabled || this.dateValidation(this.state.checkIn,this.state.checkOut) || this.state.room_type.error } onClick={this.onproceed} className="btn btn-primary " >Proceed </button>
                        </div>
                        </div>
                    
                    </div>}
                
            </div>
        )
    }
}

export default BookingSection;