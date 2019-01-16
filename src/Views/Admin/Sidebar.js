import React,{Component} from "react"
import routes from "../../Utils/routes"
import {Link,withRouter} from "react-router-dom"
import {connect} from "react-redux"
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import {setCurrentMenu} from "../../Actions/appActions"



class SubItem extends Component{
    constructor(props){
      super(props)
      this.state={isHovered:false,isActive:false}
    }

    onHover=(type)=>{
      if(type=="in"){
        this.setState({isHovered:true})
      }else if(type=="out"){
        this.setState({isHovered:false})
      }
    }

    render(){

      let subMenuStyle=Styles.subMenu

      if(this.props.isActive){
        subMenuStyle={...subMenuStyle,...Styles.subMenuActive}
      }
      else if(this.state.isHovered){
        subMenuStyle={...subMenuStyle,...Styles.subMenuHover}
      }

      let {data}=this.props
      return <Link style={Styles.link} onMouseOver={()=>{this.onHover("in")}} onMouseOut={()=>{this.onHover("out")}} to={data.link}><div style={subMenuStyle}>
               <i style={Styles.leftIconSub} className={data.icon}></i>{data.name}
             </div></Link>
    }
}

class MainItem extends Component{

  constructor(props){
    super(props)
    this.state={isHovered:false,isActive:false}
  }

  componentDidMount=()=>{
    if(this.props.pathname.indexOf(this.props.routeData.link)===0){
        this.props.setCurrentMenu(this.props.routeData.name)
    }
  }

  onHover=(type,e)=>{

    if(type=="in"){
      this.setState({isHovered:true})
    }else if(type=="out"){
      this.setState({isHovered:false})
    }
  }

  toggle=()=>{
    if(this.props.isActive){
      this.props.setCurrentMenu("")
    }else{
      this.props.setCurrentMenu(this.props.routeData.name)
    }
  }

  render(){
    let {routeData}=this.props
    let subItems=[]



    if(routeData.subItems){
      subItems=routeData.subItems.map((data,k)=>{

        let isActive=false
        if(this.props.pathname.indexOf(data.link)===0){
            isActive=true
        }

        return <SubItem isActive={isActive} key={k} data={data}/>
      })
    }

    let mainMenuStyle=Styles.mainMenu

    let isMenuActive=this.props.isActive

    if(isMenuActive){
      mainMenuStyle={...mainMenuStyle,...Styles.mainMenuActive}
    }
    else if(this.state.isHovered){
      mainMenuStyle={...mainMenuStyle,...Styles.mainMenuHover}
    }
    else{
      mainMenuStyle=Styles.mainMenu
    }


    return(<div>
              <div onClick={this.toggle} onMouseOver={(e)=>{this.onHover("in",e)}} onMouseOut={(e)=>{this.onHover("out",e)}}
                  className="" style={mainMenuStyle}
              >
                <div><i style={Styles.leftIconMain} className={routeData.icon}></i>{routeData.name}</div><i style={Styles.rightIcon} className={isMenuActive?"fas fa-minus":"fas fa-plus"}></i>
              </div>
              {routeData.subItems &&
                <Collapse isOpen={isMenuActive}>
                  {subItems}
                </Collapse>
              }
           </div>)
    }
  }


class Sidebar extends Component{
  constructor(props){
    super(props)
  }

  render(){


    let {location}=this.props
    let sidebarItems=routes.map((routeData,i)=>{

      let isLinkActive=false
      if(routeData.name===this.props.appState.currentActiveMenu){
        isLinkActive=true
      }
      return(<MainItem key={i} isActive={isLinkActive} pathname={location.pathname} activeMenuName={this.props.appState.currentActiveMenu} setCurrentMenu={this.props.setCurrentMenu} routeData={routeData}/>)
    })


    return(
      <div className="col-lg-2 p-0" style={Styles.main}>
        <div>
          {sidebarItems}
        </div>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return({
    appState:state.appState
  })
}

const mapDispatchToProps=(dispatch)=>{
  return({
    setCurrentMenu:(menuName)=>{
      dispatch(setCurrentMenu(menuName))
    }
  })
}

const Styles={
  main:{
    height:"100vh",
    backgroundColor:"#424F63",
    fontSize:"15px"
  },
  mainMenu:{
    color:"white",
    padding:"12px 22px",
    cursor:"pointer",
    display:"flex",
    alignItems:"center",
    justifyContent:"space-between"
  },
  mainMenuHover:{
    backgroundColor:"#353F4F",
    color:"#65CEA7",
  },
  mainMenuActive:{
    backgroundColor:"#353F4F",
    color:"#65CEA7",
  },
  subMenu:{
    backgroundColor:"#353F4F",
    padding:"12px 0",
    paddingLeft:"20%",
    paddingRight:"2%",
    cursor:"pointer",
    color:"white"
  },
  subMenuHover:{
    backgroundColor:"#2A323F",
    color:"#65CEA7"
  },
  subMenuActive:{
    backgroundColor:"#2A323F",
    color:"#65CEA7"
  },
  link:{
    textDecoration:"none",
    color:"inherit"
  },
  rightIcon:{
    fontSize:"8px",
  },
  leftIconMain:{
    width:"30px"
  }
  ,
  leftIconSub:{
    width:"22px",
    fontSize:"10px"
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Sidebar))
