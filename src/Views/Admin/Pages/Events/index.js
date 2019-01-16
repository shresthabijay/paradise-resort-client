import React, { Component } from 'react'
import {Switch,Redirect,Route} from "react-router-dom"
import ReactTable from "react-table"
import {getEvents} from "../../../../Utils/apis"
import ImageViewer from "../../../../Components/ImageViewer"
import Modal from "../../../../Components/Modal"
import { Formik} from 'formik';
import * as Yup from 'yup'
import {addEvent} from "../../../../Utils/apis"
import DateTime from "react-datetime"
import moment from "moment"
import {connect} from "react-redux"
import {addNotifications} from "../../../../Actions/notificationActions"


let mapDispatchToProps=(dispatch)=>{
  return({
    addNotifications:(notificationsData)=>{
      dispatch(addNotifications(notificationsData))
    }
  })
}

class EventList extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       eventData:null
    } 

    this.eventColumns= [ {
      Header: "Events",
      columns: [
        {
          Header: "Event Name",
          accessor:"name",
          width:200,
          filterable:true
        },
        {
          Header: "Description",
          accessor: "description",
          filterable:true
        },
        {
          Header: "Date and Time",
          accessor: "date_time",
          filterable:true
        },
        {
          Header: "Image",
          accessor: "image_url",
          Cell:({original})=>{
            return <ImageViewer title={original.image_url}/>
          },
          filterable:true
        },
      ]
    }]

  };
  
  componentDidMount= async ()=>{
      try{
        let {data:eventData}=await getEvents()
        this.setState({eventData})
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
              <div className="adminSubHeader"><i className="fas fa-bed adminSubIcon"></i>Events List</div>
              <hr className="adminHr"/>
              {this.state.eventData!==null && <ReactTable
                data={this.state.eventData}
                columns={this.eventColumns}
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

class AddEventForm extends React.Component{

  state={showImagePreview:false}

  render(){   
    const validationSchema = Yup.object().shape({
      name: Yup.string().required().label("Name"),
      description:Yup.string().required().label("Description"),
      image_url:Yup.string().required().label("Image Url"),
      date_time:Yup.string().required().label("Timestamp"),
    })

    return(
      
      <Formik
        onSubmit={async (values, { setSubmitting,resetForm, }) => {
          setSubmitting(true)
          this.props.showLoader()
          try{
            await addEvent(values)
            this.props.hideLoader()
            this.props.addNotifications([{message:"New Event Added",color:"success"}])
            resetForm()
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

            if(values.date_time){
              if(!moment(values.date_time,"YYYY-MM-DD HH:mm:ss", true).isValid()){
                error.date_time="Enter proper date and time format data"
              }
            }
            else{
              error.date_time="Date and Time is required"
            }

            return error
          }
        }

        render={({errors,handleChange,handleSubmit,setFieldValue,values}) => (
          <div style={{height:"100%",position:"relative"}}>
              <form onSubmit={handleSubmit} className="adminFormik p-4" onScroll={()=>{}}>
                <div className="form-group">
                  <label>Event Name:</label>
                  <input type="text" name="name" className="form-control" placeholder="Enter Name" onChange={handleChange} />
                  {errors.name && <small className="text-warning">{errors.name}</small>}
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <input type="text" name="description" className="form-control" placeholder="Enter description" onChange={handleChange} />
                  {errors.description && <small className="text-warning">{errors.description}</small>}
                </div>
                <div className="form-group">
                  <label>Date and Time:</label>
                  <DateTime utc={true}
                    renderInput={
                      (props)=>{
                        return <input type="text" name="date_time" className="form-control" placeholder="Enter date and time" {...props} />
                      }
                    }
                    onChange={
                      (value)=>{

                        let valueToStore=value

                        if(value.utc){
                          valueToStore=value.utc().format("YYYY-MM-DD HH:mm:ss")
                        }

                        setFieldValue("date_time",valueToStore)
                        
                      }
                    }
                  />
                  {errors.date_time && <small className="text-warning">{errors.date_time}</small>}
                </div>
                
                <div className="form-group">
                  <label>Image URL:</label>
                  <input type="text" name="image_url" className="form-control" placeholder="Enter image url" onChange={handleChange} />
                  {errors.image_url && <small className="text-warning">{errors.image_url}</small>}
                </div>
                <div style={{width:"100%",display:"flex",justifyContent:"end"}}>  
                  <ImageViewer title={values?values.image_url:"preview"} show={this.state.showImagePreview}/>
                </div>  
            </form>
            <hr className="date"/>
            <div className="adminFormFooter">                  
                  <div className="d-flex justify-content-center">
                    <button type="submit" onClick={e=>{console.log("asdasd"); handleSubmit(e)}} className="btn btn-info">
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

let AddEventFormExtended=connect(()=>{return {}},mapDispatchToProps)(AddEventForm)


class EventManage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       showAddEvent:false,
    };
  };

  async componentDidMount(){

  }
  
  render(){
    return (
      <div>
        <div className="adminPageHeader">Manage Events</div>
        <div className="adminPageMain">
            <div className="">
              <div className="adminSubHeader"><i className="fas fa-bed adminSubIcon"></i>Add Events</div>
              <hr className="adminHr"/>
              <br/>
              <button type="button" onClick={()=>{this.setState({showAddEvent:true})}} className="btn btn-info adminButton ml-3"><i className="fas fa-plus pr-2"></i>Add Event</button>
            </div>

            <Modal title="Add Event" data={{}} className="adminForm" isOpen={this.state.showAddEvent} toggle={()=>{this.setState({showAddEvent:!this.state.showAddEvent})}}>
              <AddEventFormExtended/>
            </Modal>
        </div>
      </div>
    )
  }
}



export default class Events extends Component {
  render() {
    let matchPath=this.props.match.path
    return (
        <Switch>
          <Route path={`${matchPath}/list`} component={EventList}/>
          <Route path={`${matchPath}/add`} component={EventManage}/>
        </Switch>
    )
  }
}
