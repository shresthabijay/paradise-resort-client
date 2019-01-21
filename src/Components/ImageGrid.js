import React from 'react'
import { Link} from 'react-router-dom'


const ImageGrid=({images})=>{
  
    return(
     
        <div className="container-fluid grid">
        <h1 >Enjoy Your Stay</h1>
            <div className="row" style={{padding:'20px'}}>
                <div className="col-sm-12 col-md-6 col-lg-3 grid-layout">
                <img src={images[0]} alt="" style={{width:'100%'}}/>
                <br/>
                <Link to="/events/foods"> <button  className="btn btn-outline-secondary"> Foods & Drinks</button></Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 grid-layout">
                <img src={images[3]} alt="" style={{width:'100%'}}/>
                <br/>
                <Link to="/events/accommodation"> <button className="btn btn-outline-secondary">Accommodation & Amenities</button> </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 grid-layout">
                <img src={images[6]} alt="" style={{width:'100%'}}/>
                <br/>
                <Link to="/events/places"> <button className="btn btn-outline-secondary">Spaces & Places</button> </Link>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-3 grid-layout">
                <img src={images[8]} alt="" style={{width:'100%'}}/>
                <br/>
                <Link to="/events/venu"> <button className="btn btn-outline-secondary">Venu Personalizer</button> </Link>
                </div>
            
            </div>
        </div>
        
    );
}

export default ImageGrid;