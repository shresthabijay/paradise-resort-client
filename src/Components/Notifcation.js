import React from "react"
import Animate from "./Animate"
import {connect} from "react-redux"
import {addNotifications,removeNotifications} from "../Actions/notificationActions"

class Notification extends React.Component{

    constructor(props) {
      super(props)
    
      this.state = {
         isMounted:true,
         isHovered:false,
      }
    }

    shouldComponentUpdate=(nextProps,nextState)=>{
        if(nextState.isMounted!==this.state.isMounted || nextState.isHovered!==this.state.isHovered){
            return true
        }

        return false
    }
    
    
    hoverIn=e=>{
        e.persist()
        this.setState({isHovered:true})
    }

    hoverOut=e=>{
        e.persist()
        this.setState({isHovered:false})
    }

    render(){
        return(
                <Animate isMounted={this.state.isMounted} animationIn="bounce" animationOut="slideOutRight" delayTime={300} triggerAfterUnMount={()=>{
                    if(this.props.afterRemove){
                        this.props.afterRemove()
                    }
                }}>
                    <div className={`shadow${this.state.isHovered?"-lg":""} notification alert alert-${this.props.color?this.props.color:"info"}`}
                        onMouseEnter={this.hoverIn} onMouseLeave={this.hoverOut}
                    >
                        <div className="notification-icon">
                            <i className="fas fa-bell"></i>
                        </div>
                        <div className="notification-message">
                            {this.props.message}
                        </div>
                        <div className="notification-remove" onClick={()=>{this.setState({isMounted:false})}}>
                            <i className="fas fa-times"></i>
                        </div>
                    </div>
                </Animate>
               
        )
    }
}

class NotificationPanel extends React.Component{

    constructor(props) {
      super(props)
    
      this.state = {
         showNotifications:true
      };
    };
    
    buttonHoverInHandler=(e)=>{
        e.persist()
        this.setState({buttonHovered:e.target.id})
    }

    buttonHoverOutHandler=(e)=>{
        e.persist()
        this.setState({buttonHovered:""})
    }

    onClearClick=()=>{
        this.setState({showNotifications:false})
    }

    afterAllClear=()=>{
        this.props.removeNotifications(this.props.notificationState.notifications)
        this.setState({showNotifications:true})
    }


    render(){
        let {notifications}=this.props.notificationState
        return(
            <div className={`notification-panel`} style={{width:"300px"}}>
                <Animate isMounted={this.state.showNotifications} animationIn=" " animationOut="rotateOut" delayTime={1000} triggerAfterUnMount={this.afterAllClear}>
                    {notifications.map(data=>{
                        return <Notification key={data.id} message={data.message} link={data.link} color={data.color} afterRemove={()=>{
                            this.props.removeNotifications([{id:data.id}])}}/>
                    })}
                </Animate>
                <div className="noitifcation-panel-bottom">
                    { notifications.length>0 &&
                    <Animate isMounted={true} animationIn="bounceIn">
                        {/* <i className={`shadow${this.state.buttonHovered==="setting"?"-lg":""} fa fa-wrench notification-buttons`} id="setting" 
                            onMouseEnter={this.buttonHoverInHandler} onMouseLeave={this.buttonHoverOutHandler}
                            onClick={this.onSettingClick}
                        ></i> */}
                        <i className={`shadow${this.state.buttonHovered==="clear"?"-lg":""} far fa-trash-alt notification-buttons`} id="clear"
                            onMouseEnter={this.buttonHoverInHandler} onMouseLeave={this.buttonHoverOutHandler}
                            onClick={this.onClearClick}
                        ></i>
                    </Animate>
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return({
        notificationState:state.notificationState
    })
}

let mapDispatchToProps=(dispatch)=>{
    return({
      removeNotifications:(notificationsData)=>{
        dispatch(removeNotifications(notificationsData))
      }
    })
  }

  
export default connect(mapStateToProps,mapDispatchToProps)(NotificationPanel)


