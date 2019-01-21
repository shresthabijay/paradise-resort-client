import React from "react"

import PropTypes from "prop-types"


const styleLeft={
    position:"absolute",
    top:"50%",
    left:"2%",
    cursor:"pointer",
    color:"#fff",
  
}

const styleRight={
    position:"absolute",
    top:"50%",
    right:"2%",
    cursor:"pointer",
    color:"#fff",

}

export const LeftArrow=(props)=>{



    return(
        <div style={styleLeft}>
        <i   className="large material-icons" onClick={props.goToPrevious} style={{fontSize:'65px',fontWeight:'bold'}}>navigate_before</i>
        </div>
    )
}

export const RightArrow=(props)=>{

   

    return(
        <div style={styleRight} >
        <i  className="large material-icons white-text" onClick={props.goToNext} style={{fontSize:'65px',fontWeight:'bold'}}>navigate_next</i>
        </div>
    )
}

LeftArrow.defaultProps={
    visible:true
}

RightArrow.defaultProps={
    visible:true
}