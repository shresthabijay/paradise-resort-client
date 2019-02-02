import React,{Component} from 'react';
import {Redirect} from "react-router-dom"
import axios from 'axios';
import '../../../Static/booking.css'
const QRCode = require('qrcode.react');


class BookingSuccess extends Component{
    constructor(props){
        super(props)
        this.state={loading:false};

    }

    downloadSvg(){
        
        axios.get('/getQRCode',  {
            booking_id: 52,
            room_no: 420
          })
          .then(function (response) {
            console.log("download successfu: ",response);
          })
          .catch(function (error) {
            console.log('error in downlaod',error);
          });
    }
    //style={{display:'flex', justifyContent:'center',fontSize: window.innerWidth >=342? '25px':'20px'}}
    render(){

        if(!this.props.location.state){
            this.props.history.push("/booking")
            return (<Redirect to="/booking"/>)
        }

        let {data,resData}=this.props.location.state

        console.log(data,resData)

        return(
            <div className={`${window.innerWidth >= 675 ?'container':'container-fluid'}`}>
                <div style={{minHeight:'100px'}}/>
                    <div className="alert alert-primary" role="alert">
                    <h2 className="text-center text-success alert-heading" >Booking Successful!</h2>
                    <hr/>
                    {
                        this.state.loading?
                        <div className='text-center'>
                            <div className="spinner-grow" style={{width: '5rem', height:'5rem'}} role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        :
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6 col-xs-12">
                                    <div className="col-md-6 col-xs-12 text-center " style={{border: '0px solid red'}}>
                                        <div className="mb-3"><strong className=" text-dark">Your QR Code:</strong> </div>
                                        
                                            <QRCode value={JSON.stringify(this.props.location.state)} renderAs='png' size={window.innerWidth>=400? 256: 128}/>
                                        
                                        <div className="m-2">
                                            <button  type="button" className="btn btn-success" onClick={this.downloadSvg}>Download</button>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 col-xs-12 alert alert-warning text-dark" role="alert">
                                    <div><strong className="text-dark">Your Info:</strong> </div>
                                    <hr/>
                                    <p style={{fontSize:'24px',display:"inline",fontWeight:'bold'}}> Booking Id:</p>  
                                    <p >{resData.bookingId}</p> <br/>
                                    <p style={{fontSize:'24px',display:"inline",fontWeight:'bold'}}>Room No:</p> <p >{resData.room_no}</p>
                                    <br/>
                                    <p style={{fontSize:'24px',display:"inline",fontWeight:'bold'}}>Name: </p>
                                    <p>{data.name}</p> 
                                    <br/>
                                    <p style={{fontSize:'24px',display:"inline",fontWeight:'bold'}}>Phone No: </p> 
                                    <p >{data.phone_no}</p>
                                    <br/>
                                    <p style={{fontSize:'24px',display:"inline",fontWeight:'bold'}}>Email:</p>
                                    <p >{data.email}</p>
                                     <br/>
                                    <p style={{fontSize:'24px',display:"inline",fontWeight:'bold'}}>Room Type: </p> 
                                    <p >{resData.room_type_name}</p>
                                    <br/>
                                    <hr/>
                                    <p style={{fontSize:'24px',display:"inline",fontWeight:'bold'}}> Total Cost:</p>  <p> ${resData.price} </p><br/>
                                </div>
                            </div>
                        </div>
                    }
                    </div>
            </div>
        )
    }
}
export default BookingSuccess;