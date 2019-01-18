import React, { Component } from 'react'
import KahltiWidget from "../../../Components/Khalti.js"

export default class BookingSection extends Component {
  render() {
    return (
      <div>
        <KahltiWidget
          amount={10000} //in paisa
          productName="Deluxe Hotel Room"
          productIdentity={1}
          productUrl="www.paradise.com"
          onSuccess={(payload)=>{
            console.log(payload)
          }}
          onError={(err)=>{
            console.log(err)
          }}
          onClose={()=>{
            console.log("Its Closing!")
          }}
        />
      </div>
    )
  }
}
