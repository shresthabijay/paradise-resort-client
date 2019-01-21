import React, { Component } from 'react'
import KahltiWidget from "../../../Components/Khalti.js"
import {Formik}from "formik"
import * as Yup from 'yup'
import {bookingWithKhalti} from "../../../Utils/apis"

export default class PayementSection extends Component {

  state={showKhaltiWidget:false,bookData:null,khaltiToken:null,bookingSuccess:false}

  componentWillMount=()=>{
      this.setState({bookData:{...this.props.location.state.bookData}})
      window.scrollTo(0,0)
  }

  render() {
    const validationSchema = Yup.object().shape({
        name: Yup.string().required().label("Name"),
        address:Yup.string().required().label("Address"),
        email:Yup.string().email("Please enter a valid email").required("Email"),
        phone:Yup.number().positive().required().label("Phone no")
    })
    console.log("lol",this.state)
    return(

        <div className="login-main">
         <div className="row d-flex justify-content-center align-items-center" style={{height:"100%",margin:"0"}}>
             <div className="card col-lg-5 login-portal" style={{padding:"0"}}>
             <div className="login-header p-2">Guest Credential and Payement</div>
             <Formik
          onSubmit={async (values, { setSubmitting,resetForm, }) => {
            this.setState({userData:values,showKhaltiWidget:true})
          }}

          validationSchema={validationSchema}
  
          validate={
            (values)=>{}
          }
  
          render={({errors,handleChange,handleSubmit,setFieldValue,values}) => (
            <div style={{height:"100%"}}>
                <form onSubmit={handleSubmit} className="p-4" onScroll={()=>{}}>
                  <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" className="form-control" placeholder="Enter Name" onChange={handleChange} />
                    {errors.name && <small className="text-warning">{errors.name}</small>}
                  </div>
                  <div className="form-group">
                    <label>Address</label>
                    <input type="text" name="address" className="form-control" placeholder="Enter address" onChange={handleChange} />
                    {errors.address && <small className="text-warning">{errors.address}</small>}
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="text" name="phone" className="form-control" placeholder="Enter phone" onChange={handleChange} />
                    {errors.phone && <small className="text-warning">{errors.phone}</small>}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="text" name="email" className="form-control" placeholder="Enter email" onChange={handleChange} />
                    {errors.email && <small className="text-warning">{errors.email}</small>}
                  </div>
              </form>
              <hr/>
              <div className="mb-2">                  
                    <div className="d-flex justify-content-center">
                      <button type="submit" onClick={e=>{handleSubmit(e)}} className="btn btn-info">
                        Proceed
                      </button>
                    </div>
              </div>
            </div>
          )}
        />
             </div>
         
         </div>
         {
             this.state.showKhaltiWidget &&
         <KahltiWidget
          amount={this.state.bookData.price_per_night*100} //in paisa
          productName="Paradise Hotel Room"
          productIdentity={this.state.bookData.room_id}
          productUrl="www.paradise.com"
          onSuccess={(payload)=>{
            let {userData,bookData}=this.state
            let data={
              "address":userData.address,
              "date_check_in":bookData.date_check_in,
              "date_check_out":bookData.date_check_out,
              "email":userData.email,
              "name":userData.name,
              "phone_no":userData.phone,
              "room_type_id":bookData.room_id,
              "token": payload.token,
              "food_service":bookData.food_service || 0
            }

            console.log(data)

            bookingWithKhalti(data).then((res)=>{
              alert("booking successfull")
              this.props.history.push("/booking-info")
              console.log(res.data)
            }).catch((err)=>{
              console.log(err)

            })

          }}
          onError={(err)=>{
            alert("You dont have enough balance in this account")
          }}
          onClose={()=>{
            this.setState({showKhaltiWidget:false})
          }}
        />
        }
        </div>
      )
    }
  }