import React, { Component } from 'react'
import Modal from "./Modal"

export default class ImageViewer extends Component {
  state={show:false}
  render() {
    return (

        <div className="d-flex justify-content-center" style={{width:"100%"}}>
            <button className="btn btn-info" onClick={(e)=>{e.preventDefault();this.setState({show:true})}}>View</button>
            <Modal passProps={false}title={this.props.title} showLoader={false} className="adminForm" isOpen={this.state.show} toggle={()=>{this.setState({show:!this.state.show})}}>
                <div style={{height:"100%",position:"relative"}}>
                    <div className="adminFormik p-4 eventImage">
                        <img style={{height:"100%"}} src={this.props.title}/>      
                    </div>
                    <hr className="adminHr"/>
                    <div className="adminFormFooter">                  
                        <div className="d-flex justify-content-center">
                        <a href={this.props.title} download>
                            <button className="btn btn-info">
                                Download
                            </button>
                        </a>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
  }
}
