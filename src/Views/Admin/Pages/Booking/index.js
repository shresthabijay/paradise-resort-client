import React, { Component } from 'react'
import {Switch,Redirect,Route} from "react-router-dom"
import ReactTable from "react-table"

import Modal from "../../../../Components/Modal"
import { Formik} from 'formik';
import Select from "react-select"
import * as Yup from 'yup'
import {getAllRoomTypes,getRoomCategories,updateBooking,getBooking,getRoomTypeFromCategory,getRoomsByType,addBooking} from "../../../../Utils/apis"
import moment from "moment"
import {connect} from "react-redux"
import {addNotifications} from "../../../../Actions/notificationActions"
import DateTime from "react-datetime"

let mapDispatchToProps=(dispatch)=>{
  return({
    addNotifications:(notificationsData)=>{
      dispatch(addNotifications(notificationsData))
    }
  })
}

class BookingForm extends React.Component{


  shouldComponentUpdate=(nextProps,nextState)=>{
    return false
  }

  render(){  
    const validationSchema = Yup.object().shape({
      name: Yup.string().required().label("Name"),
      email:Yup.string().email("It should be in the format of email").required().label("Email"),
      address:Yup.string().required().label("Address"),
      phone_no:Yup.number().positive().required().label("Phone Number"),
      room_no:Yup.number().required().label("Room Number"),
      status:Yup.string().required().label("Status"),
      has_paid:Yup.boolean().required().label("has_paid"),
      food_service:Yup.boolean().label("food_service"),
    })

    let initialValues=this.props.initialValues || []
    initialValues.date_check_in=moment(initialValues.date_check_in).utc().format("YYYY-MM-DD HH:mm:ss")
    initialValues.date_check_out=moment(initialValues.date_check_out).utc().format("YYYY-MM-DD HH:mm:ss")

    return(
      
      <Formik

        initialValues={initialValues}

        onSubmit={async (values, { setSubmitting,resetForm, }) => {
          setSubmitting(true)
          this.props.showLoader()
          try{
            let res=await this.props.onSubmit(values)
            this.props.hideLoader()

            if(res.data.err===1){
                this.props.addNotifications([{message:"Payment required!",color:"danger"}])
            }
            else{
              this.props.hideLoader()
              this.props.addNotifications([{message:this.props.notificationMessage,color:"success"}])
              this.props.afterUpdate()
              this.props.toggle()
              resetForm()
            }
          }
          catch(err){
            this.props.addNotifications([{message:"Please check the fields!",color:"danger"}])
          }
        }}
        validationSchema={validationSchema}

        validate={
          (values)=>{

            let error={}

            if(values.phone_no<=10){
              error.phone_no="Phone Number should not be more than 10 digits"
            }

            if(values.date_check_in){
              if(!moment(values.date_check_in,"YYYY-MM-DD HH:mm:ss", true).isValid()){
                error.date_check_in="Enter proper date and time format data"
              }
            }
            else{
              error.date_check_in="Date and Time is required"
            }

            if(values.date_check_out){
              if(!moment(values.date_check_out,"YYYY-MM-DD HH:mm:ss", true).isValid()){
                error.date_check_out="Enter proper date and time format data"
              }
            }
            else{
              error.date_check_out="Date and Time is required"
            }

            return error
          }
        }

        render={({errors,handleChange :hc,handleSubmit,setFieldValue,values}) =>{

          let handleChange=hc

          if(!this.props.shouldAllowUpdate){
            handleChange=()=>{
              
            }
          }

          return <div style={{height:"100%",position:"relative"}}>
              <form onSubmit={handleSubmit} className="adminFormik p-4" onScroll={()=>{}}>
                <div className="form-group">
                  <label>Event Name:</label>
                  <input disabled={true} type="text" name="name" className="form-control" value={values.name} placeholder="Enter Name" onChange={handleChange} />
                  {errors.name && <small className="text-warning">{errors.name}</small>}
                </div>
                <div className="form-group">
                  <label>phone Number:</label>
                  <input type="text" name="phone_no" className="form-control" value={values.phone_no} placeholder="Enter phone no" onChange={handleChange} />
                  {errors.phone_no && <small className="text-warning">{errors.phone_no}</small>}
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <input disabled={true} type="text" name="address" className="form-control" value={values.address} placeholder="Enter address" onChange={handleChange} />
                  {errors.address && <small className="text-warning">{errors.address}</small>}
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="text" name="email" className="form-control" value={values.email} placeholder="Enter email" onChange={handleChange} />
                  {errors.email && <small className="text-warning">{errors.email}</small>}
                </div>
                <div className="form-group">
                  <label>Check In Date:</label>
                  <DateTime utc={true}
                    renderInput={
                      (props)=>{
                        return <input disabled={true} type="text" name="date_check_in" className="form-control" placeholder="Enter check in date" {...props} />
                      }
                    }
                    onChange={
                      (value)=>{

                        let valueToStore=value

                        if(value.utc){
                          valueToStore=value.utc().format("YYYY-MM-DD HH:mm:ss")
                        }

                        setFieldValue("date_check_in",valueToStore)
                        
                      }
                    }
                    value={values.date_check_in}
                  />
                  {errors.date_check_in && <small className="text-warning">{errors.date_check_in}</small>}
              </div>
                <div className="form-group">
                  <label>Check Out Date:</label>
                  <DateTime utc={true}
                    renderInput={
                      (props)=>{
                        return <input disabled={true} type="text" name="date_check_out" className="form-control" placeholder="Enter date and time" {...props} />
                      }
                    }
                    onChange={
                      (value)=>{

                        let valueToStore=value

                        if(value.utc){
                          valueToStore=value.utc().format("YYYY-MM-DD HH:mm:ss")
                        }

                        setFieldValue("date_check_out",valueToStore)
                        
                      }
                    }

                    value={values.date_check_out}
                  />
                  {errors.date_check_out && <small className="text-warning">{errors.date_check_out}</small>}
                </div>
                <div className="form-group">
                  <label>Room No:</label>
                  <input disabled={true} type="text" name="room_no" className="form-control" value={values.room_no} placeholder="Enter room no" onChange={handleChange} />
                  {errors.room_no && <small className="text-warning">{errors.room_no}</small>}
                </div>
                <div className="form-group">
                  <label>Payment Detail:</label>
                  <Select
                    name="has_paid"
                    value={{label:values.has_paid?"Paid":"Not Paid",value:values.has_paid===1?true:false}}
                    options={[{label:"Paid",value:true},{label:"Not Paid",value:false}]}
                    onChange={(data)=>{setFieldValue("has_paid",data.value)}}
                    isClearable={false}
                  />
                  {errors.has_paid && <small className="text-warning">{errors.has_paid}</small>}
                </div>
                <div className="form-group">
                  <label>Food Service:</label>
                  <input type="text" name="food_service" className="form-control" value={values.food_service===1?"Yes":"None"} placeholder="Enter room no" onChange={handleChange} />
                  {errors.food_service && <small className="text-warning">{errors.food_service}</small>}
                </div>

                <div className="form-group">
                  <label>Status:</label>
                  <Select
                    name="status"
                    options={this.props.statusData || []}
                    value={{label:values.status,value:values.status}}
                    isDisabled={!this.props.shouldAllowUpdate}
                    onChange={(data)=>{setFieldValue("status",data.value)}}
                    isClearable={false}
                  />
                </div>
           
            </form>
            <hr className="date"/>
            <div className="adminFormFooter">                  
                  <div className="d-flex justify-content-center">
                    <button disabled={!this.props.shouldAllowUpdate} type="submit" onClick={e=>{handleSubmit(e)}} className="btn btn-info">
                      {this.props.buttonName}
                    </button>
                    <button className="ml-3 btn btn-danger" type="button" onClick={this.props.toggle}>
                      Cancel
                    </button>
                  </div>
            </div>

          
        </div>
                 
        }}
      />
    )
  }
}

let BookingFormExtended=connect(()=>{return {}},mapDispatchToProps)(BookingForm)


let UpdateBookingForm=(props)=>{

  let statusData=null
  let shouldAllowUpdate=true


  if(props.initialValues.status==="yet to arrive"){
    statusData=[props.statusData[0],props.statusData[1],props.statusData[3],props.statusData[4]]
  }
  else if(props.initialValues.status==="checked in"){
    statusData=[props.statusData[2],props.statusData[3]]
  }
  else{
    statusData=props.statusData
    shouldAllowUpdate=false
  }
  
  return <BookingFormExtended 
    {...props}
    buttonName="Update"
    statusData={statusData}
    shouldAllowUpdate={shouldAllowUpdate}
    notificationMessage="Updated Record Successfully!"
    onSubmit={
      (values)=>{
        return updateBooking(values)
      }
    }/>
}


class AddBookingForm extends React.Component{

  state={
    roomDataOptions:null,
    roomTypeOptions:null,
    roomCategoryDataOptions:null
  }

  componentDidMount=async ()=>{
    try{
      let {data}=await getRoomCategories()
      let roomCategoryDataOptions=data.map((d)=>{
        return {label:d.name,value:d.name}
      })
      this.setState({roomCategoryDataOptions})
    }
    catch(err){
      
    }
  }

  syncRoomType=async(room_category_name)=>{
    try{
      let {data} = await getRoomTypeFromCategory({room_category_name})
      let roomTypeOptions=data.map(d=>{
        return {label:d.name+"("+d.quantity+")",value:d.id}
      })
      this.setState({roomTypeOptions})
    }
    catch(err){

    }
  }

  shouldComponentUpdate=(nextProps,nextState)=>{
    if(nextState.roomDataOptions!==this.state.roomDataOptions || nextState.roomCategoryDataOptions!==this.state.roomCategoryDataOptions || nextState.roomTypeOptions!==this.state.roomTypeOptions){
      return true
    }
    return false
  }

  getRoomData=async (room_type_id)=>{
    try{
      let results=await getRoomsByType({room_type_id})
      
      let data=results.data.filter(data=>{
        if(data.status==="available"){
          return true
        }       
        return false
      })

      

      let roomDataOptions=data.map(data=>{
        return {label:data.room_no,value:data.room_no}
      })

      this.setState({roomDataOptions})

    }
    catch{

    }
  }

  getRoomCategoryData=async(category_name)=>{

  }

  render(){  
    const validationSchema = Yup.object().shape({
      name: Yup.string().required().label("Name"),
      email:Yup.string().email("It should be in the format of email").required().label("Email"),
      address:Yup.string().required().label("Address"),
      phone_no:Yup.number().positive().required().label("Phone Number"),
      room_no:Yup.number().required().label("Room Number"),
      room_type_id:Yup.number().required().label("Room Type ID"),
      has_paid:Yup.boolean().required().label("Payment Detail"),
      food_service:Yup.boolean().required().label("Food Service"),
    })

    return(
      
      <Formik
        onSubmit={async (values, { setSubmitting,resetForm, }) => {
          this.props.showLoader()
          try{
            await addBooking(values)
            this.props.hideLoader()
            this.props.addNotifications([{message:"Booking Successful!",color:"success"}])
            this.props.afterUpdate()
            this.props.toggle()
          }
          catch(err){
            this.props.hideLoader()
            this.props.addNotifications([{message:"Please check your fields!",color:"danger"}])
          }
        }}
        validationSchema={validationSchema}

        validate={
          (values)=>{

            let error={}

            if(values.phone_no<=10){
              error.phone_no="Phone Number should not be more than 10 digits"
            }

            if(values.date_check_in){
              if(!moment(values.date_check_in,"YYYY-MM-DD HH:mm:ss", true).isValid()){
                error.date_check_in="Enter proper date and time format data"
              }
            }
            else{
              error.date_check_in="Date and Time is required"
            }

            if(values.date_check_out){
              if(!moment(values.date_check_out,"YYYY-MM-DD HH:mm:ss", true).isValid()){
                error.date_check_out="Enter proper date and time format data"
              }
            }
            else{
              error.date_check_out="Date and Time is required"
            }

            return error
          }
        }

        render={({errors,handleChange,handleSubmit,setFieldValue,values}) =>{
          return <div style={{height:"100%",position:"relative"}}>
              <form onSubmit={handleSubmit} className="adminFormik p-4" onScroll={()=>{}}>
                <div className="form-group">
                  <label>Name:</label>
                  <input type="text" name="name" className="form-control"  placeholder="Enter Name" onChange={handleChange} />
                  {errors.name && <small className="text-warning">{errors.name}</small>}
                </div>
                <div className="form-group">
                  <label>phone Number:</label>
                  <input type="text" name="phone_no" className="form-control" placeholder="Enter phone no" onChange={handleChange} />
                  {errors.phone_no && <small className="text-warning">{errors.phone_no}</small>}
                </div>
                <div className="form-group">
                  <label>Address:</label>
                  <input type="text" name="address" className="form-control"  placeholder="Enter address" onChange={handleChange} />
                  {errors.address && <small className="text-warning">{errors.address}</small>}
                </div>
                <div className="form-group">
                  <label>Email:</label>
                  <input type="text" name="email" className="form-control"  placeholder="Enter email" onChange={handleChange} />
                  {errors.email && <small className="text-warning">{errors.email}</small>}
                </div>
                <div className="form-group">
                  <label>Check In Date:</label>
                  <DateTime utc={true}
                    renderInput={
                      (props)=>{
                        return <input type="text" name="date_check_in" className="form-control" placeholder="Enter check in date" {...props} />
                      }
                    }
                    onChange={
                      (value)=>{

                        let valueToStore=value

                        if(value.utc){
                          valueToStore=value.utc().format("YYYY-MM-DD HH:mm:ss")
                        }

                        setFieldValue("date_check_in",valueToStore)
                        
                      }
                    }
                  />
                  {errors.date_check_in && <small className="text-warning">{errors.date_check_in}</small>}
              </div>
                <div className="form-group">
                  <label>Check Out Date:</label>
                  <DateTime utc={true}
                    renderInput={
                      (props)=>{
                        return <input type="text" name="date_check_out" className="form-control" placeholder="Enter date and time" {...props} />
                      }
                    }
                    onChange={
                      (value)=>{

                        let valueToStore=value

                        if(value.utc){
                          valueToStore=value.utc().format("YYYY-MM-DD HH:mm:ss")
                        }

                        setFieldValue("date_check_out",valueToStore)
                        
                      }
                    }
                  />
                  {errors.date_check_out && <small className="text-warning">{errors.date_check_out}</small>}
                </div>
                <div className="form-group">
                  <label>Room Category:</label>
                  <Select
                    name="room_category_name"
                    options={this.state.roomCategoryDataOptions || []}
                    onChange={(data)=>{
                      setFieldValue("room_category_name",data.value)
                      this.syncRoomType(data.value)
                    }}
                    isClearable={false}
                  />
                  {errors.room_type_id && <small className="text-warning">{errors.room_type_id}</small>}
                </div>

                <div className="form-group">
                  <label>Room Sizes:</label>
                  <Select
                    name="room_type_id"
                    options={this.state.roomTypeOptions || []}
                    onChange={(data)=>{
                      setFieldValue("room_type_id",data.value)
                      this.getRoomData(data.value)
                    }}
                    isDisabled={!values.room_category_name}
                    isClearable={false}
                  />
                  {errors.room_type_id && <small className="text-warning">{errors.room_type_id}</small>}
                </div>

                <div className="form-group">
                  <label>Room Number:</label>
                  <Select
                    name="room_no"
                    options={this.state.roomDataOptions || []}
                    onChange={(data)=>{setFieldValue("room_no",data.value)}}
                    isDisabled={!values.room_type_id}
                    isClearable={false}
                  />
                  {errors.room_no && <small className="text-warning">{errors.room_no}</small>}
                </div>
                
                <div className="form-group">
                  <label>Payment Detail:</label>
                  <Select
                    name="has_paid"
                    options={[{label:"Paid",value:true},{label:"Not Paid",value:false}]}
                    onChange={(data)=>{setFieldValue("has_paid",data.value)}}
                    isClearable={false}
                  />
                  {errors.room_no && <small className="text-warning">{errors.room_no}</small>}
                </div>
                <div className="form-group">
                  <label>Food Service:</label>
                  <Select
                    name="food_service"
                    options={[{label:"Yes",value:true},{label:"None",value:false}]}
                    onChange={(data)=>{setFieldValue("food_service",data.value)}}
                    isClearable={false}
                  />
                  {errors.room_no && <small className="text-warning">{errors.room_no}</small>}
                </div>
            </form>
            <hr className="date"/>
            <div className="adminFormFooter">                  
                  <div className="d-flex justify-content-center">
                    <button type="submit" onClick={(e)=>{handleSubmit(e)}}className="btn btn-info">
                      Create Booking
                    </button>
                    <button className="ml-3 btn btn-danger" type="button" onClick={this.props.toggle}>
                      Cancel
                    </button>
                  </div>
            </div>
        </div>
                 
        }}
      />
    )
  }
}

let AddBookingFormExtended=connect(()=>{return {}},mapDispatchToProps)(AddBookingForm)


let BookingStatus=(props)=>{
  let status=props.status
  return(
    <span>
      <span style={{
        color: status === 'checked in' ? 'teal'
          : status === 'yet to arrive' ? 'orange'
          :"brown",
        transition: 'all .3s ease'
      }}>
        &#x25cf;
      </span> {
        status
      }
    </span>
  )
}

class BookingList extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       bookingData:null,
       roomTypeData:null,
       statusData:[
         {label:"yet to arrive",value:"yet to arrive"},
         {label:"checked in",value:"checked in"},
         {label:"checked out",value:"checked out"},
         {label:"expired",value:"expired"},
         {label:"did not arrive",value:"did not arrive"},
       ],
       currentBookingRecord:[]
    } 

    this.bookingColumns= [ {
      Header: "Booking",
      columns: [
        {
          Header: "Book Id",
          accessor:"id",
          width:100,
          filterable:true
        },
        {
          Header: "Name",
          accessor:"name",
          width:120,
          filterable:true
        },
        {
          Header: "Phone Number",
          accessor: "phone_no",
          width:150,
          filterable:true
        },
        {
          Header: "Address",
          accessor: "address",
          width:150,
          filterable:true
        },
        {
          Header: "Check In Date",
          accessor: "date_check_in",
          width:200,
          Cell:({original})=>{
            return <div>{moment(original.date_check_in).format('MMM Do YY, h:mm a')}</div>
          },
          filterable:true
        },
        {
          Header: "Check Out Date",
          accessor: "date_check_out",
          width:200,
          Cell:({original})=>{
            return <div>{moment(original.date_check_out).format('MMM Do YY, h:mm a')}</div>
          },
          filterable:true
        },
        {
          Header: "Room No",
          accessor:"room_no",
          width:100,
          filterable:true
        },
        {
          Header: "Status",
          accessor:"status",
          width:150,
          filterable:true,
          Cell:({original})=>{
            return <BookingStatus status={original.status}/>
          }
        },
        {
          Header: "Manage",
          accessor:"status",
          width:150,
          Cell:({original})=>{
            return <div>
                    <button className="btn btn-info" onClick={()=>{this.setState({showUpdateBooking:true,currentBookingRecord:original})}}>Edit</button>
                  </div>
          },
          filterable:true
        },
        
      ]
    }]

  };
  
  componentDidMount= async ()=>{
      try{
        let [{data:bookingData},{data:roomTypeData}]=[await getBooking(),await getAllRoomTypes()]
        this.setState({bookingData,roomTypeData})
      }
      catch(err){
      }
  }
  
  syncData= async ()=>{
    try{
      let {data:bookingData}=await getBooking()
      this.setState({bookingData})
    }
    catch(err){
    }
  }

  render(){
    return (
      <div>
        <div className="adminPageHeader">Booking List</div>
        <div className="adminPageMain">
            <div className="">
              <div className="adminSubHeader"><i className="fas fa-bed adminSubIcon"></i>Book Rooms</div>
              <hr className="adminHr"/>
              <br/>
              <button type="button" onClick={()=>{this.setState({showAddBooking:true})}} className="btn btn-info adminButton ml-3"><i className="fas fa-plus pr-2"></i>Create Booking</button>
            </div>
            <div className="mt-4">
              <div className="adminSubHeader"><i className="fas fa-bed adminSubIcon"></i>Booking List</div>
              <hr className="adminHr"/>
              {this.state.bookingData!==null && <ReactTable
                data={this.state.bookingData}
                columns={this.bookingColumns}
                defaultPageSize={10}
                className="-highlight -striped"
              />
              }
            </div>
            <Modal passProps={true} title="Update Booking" data={{}} className="adminForm" isOpen={this.state.showUpdateBooking} toggle={()=>{this.setState({showUpdateBooking:!this.state.showUpdateBooking})}}>
                <UpdateBookingForm afterUpdate={this.syncData} statusData={this.state.statusData} initialValues={this.state.currentBookingRecord} toggle={()=>{this.setState({showUpdateBooking:!this.state.showUpdateBooking})}}/>
            </Modal>
            {
            <Modal passProps={true} title="Create Booking" data={{}} className="adminForm" isOpen={this.state.showAddBooking} toggle={()=>{this.setState({showAddBooking:!this.state.showAddBooking})}}>
                <AddBookingFormExtended  afterUpdate={this.syncData} roomTypeData={this.state.roomTypeData || []} toggle={()=>{this.setState({showAddBooking:!this.state.showAddBooking})}}/>
            </Modal>
            }
        </div>
      </div>
    )
  }
}

export default class Booking extends Component {
  
  render() {
    let matchPath=this.props.match.path
    return (
        <Switch>
          <Route path={`${matchPath}/list`} component={BookingList}/>
          <Route exact path={`${matchPath}/`} component={()=>{
            return <Redirect to={`${matchPath}/list`}/>
          }}/>
        </Switch>
    )
  }
}
