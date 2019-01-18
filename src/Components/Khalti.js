import React, { Component } from 'react'
import * as KhaltiCheckout from "khalti-web"
import config from "../client.config"


export default class Khalti extends Component {
  constructor(props) {
    super(props)

    this.config = {
        "publicKey":config.khaltiConfig.publicKey,
        "productIdentity":this.props.productIdentity,
        "productName":this.props.productName,
        "productUrl":this.props.productUrl,
        "eventHandler": {
            onSuccess:(payload)=>{
                this.props.onSuccess(payload)
            },
            onError:(error)=>{
                this.props.onError(error)
            },
            onClose:()=>{
                this.props.onClose()
            }
        }
      };
    this.KahltiWidget = new KhaltiCheckout(this.config);
  }

  componentDidMount=()=>{
    this.KahltiWidget.show({amount:this.props.amount})
  }

  render() {
    return (
      <div>    
      </div>
    )
  }
}
