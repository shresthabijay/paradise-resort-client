import React from 'react'
import DatePicker from "react-datepicker";
 

class Bookbar extends React.Component{
    constructor(){
        super();
        this.state={
             checkIn:new Date(),
            checkOut:new Date(),
            adults:1,
            children:0,
        }
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
       onhandleClick=()=>{
        this.props.history.push('/service', { checkIn:this.state.checkIn,checkOut:this.state.checkOut,adults:this.state.adults,children:this.state.children })
       }

    render(){
        return(
            <div className="container bookingbarMain">
             <div className="booking-banner" style={{backgroundColor:'rgba(48,41,57)'}}> 
            
            <div className="row ">
            <div className=" col-sm-12 col-md-12 col-lg-3 mb-md-2 mr-lg-2 mb-sm-3">
                <label className="customs" >Check-In</label>

                <DatePicker
                className="form-control"
                selected={this.state.checkIn}
                onChange={this.handleChange}
                onSelect={this.handleSelectIn}
                />
                
                 <i className="material-icons">date_range</i>
             </div>

            
            <div className="col-sm-12 col-md-12 col-lg-3 mb-md-2 mr-lg-2 mb-sm-3">
                <label className="customs">Check-Out</label>
                <DatePicker
                
                 className="form-control"
                selected={this.state.checkOut}
                onChange={this.handleChange}
                onSelect={this.handleSelectOut}
                />
        
                 <i className="material-icons">date_range</i>
                </div>

            <div className="col-sm-12  col-md-12 col-lg-2 mb-md-2 mr-lg-2 mb-sm-3">
            <label >Adults</label>

            
           
            <select className="custom-select" id="adults" onChange={this.onHandleChange}>
            
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            
            </select>

            </div>
            <div className="col-sm-12 col-md-12 col-lg-2">
            <label >Children</label>
            <select className="custom-select" id="children" onChange={this.onHandleChange}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            </select>
            
            </div>
            <div className="row " style={{margin:'32px 4px'}}>
            <div className="col">
                <button className="btn btn-secondary" onClick={this.onhandleClick}>Book Now</button>
            </div>
            </div>

            </div>
             </div>
            </div>
        )
    }
}

export default Bookbar