import React, { Component } from 'react'
import {Switch,Redirect,Route} from "react-router-dom"
import ReactTable from "react-table"
import {getAllRooms,getAllRoomTypes,addRoom,addRoomType} from "../../../../Utils/apis"
import Modal from "../../../../Components/Modal.js"
import { Formik} from 'formik';
import * as Yup from 'yup'
import Select from "react-select"
import {addNotifications} from "../../../../Actions/notificationActions"
import DateTime from "react-datetime"
import {connect} from "react-redux"

let mapDispatchToProps=(dispatch)=>{
  return({
    addNotifications:(notificationsData)=>{
      dispatch(addNotifications(notificationsData))
    }
  })
}

let RoomStatus=(props)=>{
  let status=props.status
  return(
    <span>
      <span style={{
        color: status === 'booked' ? 'teal'
          : status === 'available' ? 'green'
          :status==="maintenance"?'brown':"",
        transition: 'all .3s ease'
      }}>
        &#x25cf;
      </span> {
        status
      }
    </span>
  )
}
class RoomList extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       roomdata:null,
       roomtypedata:null
    } 

    this.roomsColumns= [ {
      Header: "Rooms",
      columns: [
        {
          Header: "Room Number",
          accessor:"room_no",
          width:200,
          filterable:true
        },
        {
          Header: "Room Type",
          accessor: "room_type",
          filterable:true
        },
        {
          Header: "Room Price",
          accessor: "room_price",
          filterable:true
        },
        {
          Header: "Status",
          accessor: "status",
          filterable:true,
          Cell:(row)=>{
            return <RoomStatus status={row.original.status}/>
          }
          
        }
      ]
    }]

    this.roomtypesColumns= [ {
      Header: "Room Types",
      columns: [
        {
          Header: "Name",
          accessor:"name",
          width:400,
          filterable:true
        },
        {
          Header: "Price",
          accessor: "price_per_night",
          width:250,
          filterable:true,
        },
        {
          Header: "Description",
          accessor: "description",
          filterable:true
        },
      ]
    }]

  };
  
  componentDidMount= async ()=>{
      try{
        let [{data:roomdata},{data:roomtypedata}]= [await getAllRooms(),await getAllRoomTypes()]
        this.setState({roomdata,roomtypedata})
      }
      catch(err){
        
      }
  }
  
  render(){
    return (
      <div>
        <div className="adminPageHeader">Room List</div>
        <div className="adminPageMain">
            <div className="">
              <div className="adminSubHeader"><i className="fas fa-bed adminSubIcon"></i>Hotel Rooms</div>
              <hr className="adminHr"/>
              {this.state.roomdata!==null && <ReactTable
                data={this.state.roomdata}
                columns={this.roomsColumns}
                defaultPageSize={5}
                className="-highlight -striped"
              />
              }
            </div>
            <div className="pt-4">
              <div className="adminSubHeader"><i className="fas fa-bed adminSubIcon"></i>Room Types</div>
              <hr className="adminHr"/>
              {this.state.roomtypedata!==null && <ReactTable
                data={this.state.roomtypedata}
                columns={this.roomtypesColumns}
                defaultPageSize={5}
                className="-highlight -striped"
              />
              }
            </div>
        </div>
      </div>
    )
  }
}

class AddRoomForm extends React.Component{
  render(){
    
    const validationSchema = Yup.object().shape({
      room_no: Yup.number().positive("It must be positive").integer("It must be integer").required().label("Room Number")
    })

    return(
      
      <Formik
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          this.props.showLoader()
          try{
            await addRoom(values)
            this.props.hideLoader()
            this.props.addNotifications([{message:"New Room Added"}])
          }
          catch(err){
            this.props.hideLoader()
            this.props.addNotifications([{message:"Room number is already taken"}])
          }
        }}
        validationSchema={validationSchema}
        render={({errors, values,handleChange,handleSubmit,setFieldValue,isSubmitting}) => (
          <div style={{height:"100%",position:"relative"}}>
              <form onSubmit={handleSubmit} className="adminFormik p-4" onScroll={()=>{}}>
                <div className="form-group">
                  <label>Room Number:</label>
                  <input type="text" name="room_no" class="form-control" placeholder="Enter Room No" onChange={handleChange} />
                  {errors.room_no && <small className="text-warning">{errors.room_no}</small>}
                </div>
                <div className="form-group">
                  <label>Room Type:</label>
                  <Select
                    name="room_type_id"
                    options={this.props.data.roomTypesData || []}
                    onChange={(data)=>{setFieldValue("room_type_id",data.value)}}
                    isClearable={false}
                  />
                </div>
            </form>
            <hr className="adminHr"/>
            <div className="adminFormFooter">                  
                  <div className="d-flex justify-content-center">
                    <button type="submit" onClick={e=>handleSubmit(e)} className="btn btn-info">
                      Add
                    </button>
                    <button className="ml-3 btn btn-danger" type="button" onClick={this.props.toggle}>
                      Cancel
                    </button>
                  </div>
            </div>
          </div>
        )}
      />
    )
  }
}

let AddRoomFormExtended=connect(()=>{return {}},mapDispatchToProps)(AddRoomForm)



class AddRoomTypeForm extends React.Component{
  render(){
    
    const validationSchema = Yup.object().shape({
      name: Yup.string().required().label("Name"),
      description:Yup.string().required().label("Description"),
      price_per_night:Yup.number().positive("It must be positive").integer("It must be integer").required().label("Price")
    })

    return(
      
      <Formik
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true)
          this.props.showLoader()
          try{
            await addRoomType(values)
            this.props.hideLoader()
            this.props.addNotifications([{message:"New Room Type Added"}])
          }
          catch(err){
            this.props.hideLoader()
            this.props.addNotifications([{message:"Please check your fields!"}])
          }
        }}
        validationSchema={validationSchema}
        render={({errors, values,handleChange,handleSubmit,setFieldValue,isSubmitting}) => (
          <div style={{height:"100%",position:"relative"}}>
              <form onSubmit={handleSubmit} className="adminFormik p-4" onScroll={()=>{}}>
                <div className="form-group">
                  <label>Room Type Name:</label>
                  <input type="text" name="name" class="form-control" placeholder="Enter Name" onChange={handleChange} />
                  {errors.name && <small className="text-warning">{errors.name}</small>}
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <input type="text" name="description" class="form-control" placeholder="Enter description" onChange={handleChange} />
                  {errors.description && <small className="text-warning">{errors.description}</small>}
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input type="text" name="price_per_night" class="form-control" placeholder="Enter price" onChange={handleChange} />
                  {errors.price_per_night && <small className="text-warning">{errors.price_per_night}</small>}
                </div>               
            </form>
            <hr className="adminHr"/>
            <div className="adminFormFooter">                  
                  <div className="d-flex justify-content-center">
                    <button type="submit" onClick={e=>handleSubmit(e)} className="btn btn-info">
                      Add
                    </button>
                    <button className="ml-3 btn btn-danger" type="button" onClick={this.props.toggle}>
                      Cancel
                    </button>
                  </div>
            </div>
          </div>
        )}
      />
    )
  }
}

let AddRoomTypeFormExtended=connect(()=>{return {}},mapDispatchToProps)(AddRoomTypeForm)

class RoomManage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showAddRoom:false,
       showAddRoomType:false,
       roomTypesData:null
    };
  };

  async componentDidMount(){

    try{
      let {data}=await getAllRoomTypes()

      let roomTypesData=data.map((data)=>{
        return {label:data.name,value:data.id}
      })

      console.log(roomTypesData)

      this.setState({
        roomTypesData
      })
    }
    catch(err){
      console.log(err)
    }

  }
  
  render(){
    return (
      <div>
        <div className="adminPageHeader">Manage Rooms</div>
        <div className="adminPageMain">
            <div className="">
              <div className="adminSubHeader"><i className="fas fa-bed adminSubIcon"></i>Add Rooms</div>
              <hr className="adminHr"/>
              <br/>
              <button type="button" onClick={()=>{this.setState({showAddRoom:true})}} class="btn btn-info adminButton ml-3"><i class="fas fa-plus pr-2"></i>Add Room</button>
            </div>

            <div className="pt-4">
              <div className="adminSubHeader"><i className="fas fa-bed adminSubIcon"></i>Add Room Type</div>
              <hr className="adminHr"/>
              <br/>
              <button type="button" onClick={()=>{this.setState({showAddRoomType:true})}} class="btn btn-info adminButton ml-3"><i class="fas fa-plus pr-2"></i>Add Room Type</button>
            </div>
            <Modal title="Add Room" data={{roomTypesData:this.state.roomTypesData}} className="adminForm" isOpen={this.state.showAddRoom} toggle={()=>{this.setState({showAddRoom:!this.state.showAddRoom})}}>
              <AddRoomFormExtended/>
            </Modal>
            <Modal title="Add Room Type" data={{}} className="adminForm" isOpen={this.state.showAddRoomType} toggle={()=>{this.setState({showAddRoomType:!this.state.showAddRoomType})}}>
              <AddRoomTypeFormExtended/>
            </Modal>
        </div>
      </div>
    )
  }
}

export default class Rooms extends Component {
  render() {
    let matchPath=this.props.match.path
    return (
        <Switch>
          <Route path={`${matchPath}/list`} component={RoomList}/>
          <Route path={`${matchPath}/manage`} component={RoomManage}/>
        </Switch>
    )
  }
}
