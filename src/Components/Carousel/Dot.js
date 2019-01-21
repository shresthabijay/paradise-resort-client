import React,{Component} from "react"
import PropTypes from "prop-types" 

export const Dot=({index,isActive,clickHandler})=>{
    let style={
        background: "#222",
        display: "inline-block",
        padding: "10px",
        marginRight: "5px",
        cursor: "pointer",
        borderRadius: "50%"
    }

    let activeStyle={...style,background:"#fff"}

    return <div style={isActive?activeStyle:style} onClick={()=>{clickHandler(index)}} ></div>
}

const Dots=({activeIndex,images,clickHandler,visible})=>{

    if(!visible) return null
    

    const dotGroup=images.map((image,i)=>{
        let active=(i===activeIndex)?true:false

        return(
            <Dot
                key={i}
                index={i}
                clickHandler={clickHandler}
                isActive={active}
            />
        )
    })

    let style={
       position:"absolute",
       width:"100%",
       bottom:"2%",
       textAlign:"center"
    }

    return(
        <div className="dot-container" style={style}>
            {dotGroup}
        </div>
    )
}

Dots.defaultProps={
    visible:true
}

export default Dots