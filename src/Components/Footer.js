import React from 'react';
import logo from '../assets/logo.png'


const Footer =()=>{
    return(
        <div className="footer-wrapper">
                <div className="main-footer container">
                <div className="row">
                <div className="col-lg-6  mb-sm-2 social-media">
                <div className="row">
                <h5 style={{color:'#fff'}}>Connect with Paradise</h5>
                </div>
                <div className="row" style={{borderBottom:'2px solid #fff'}}>
                  
                   <div className="social-icons" >
                    <a href="https://www.instagram.com/" ><i className="fab fa-instagram" style={{fontSize:'25px'}}></i></a>
                    <a href="https://www.facebook.com/" ><i className="fab fa-facebook" style={{fontSize:'25px'}}></i></a>
                    <a href="https://plus.google.com/discover/" ><i className="fab fa-google" style={{fontSize:'25px'}}></i></a>
                    <a href="https://www.twitter.com/" ><i className="fab fa-twitter" style={{fontSize:'25px'}}></i></a>
                    <a href="https://www.youtube.com/" ><i className="fab fa-youtube" style={{fontSize:'25px'}}></i></a>
                    {/* <a href="https://www.instagram.com/" ><i className="fab fa-google-plus" style={{fontSize:'25px'}}></i></a> */}

                    </div>
                </div>
                <div className="row toadd">
                    <h2 style={{color:'#fff',marginTop:'25px',fontFamily:'Charm,cursive'}}>Greetings and Warm Wishes</h2>
                </div>
                <div className="row" style={{marginTop:'20px'}}>
                    <h4 style={{color:'#fff'}} >Paradise.com</h4>
                   
                </div>
                <div className="row" style={{marginTop:'20px'}}>
                <h4 style={{fontFamily:'Charm, cursive',color:'#fff'}}>best rate GUARANTEE</h4>
                   
                </div>

                </div>
                <div className="col-lg-4 reservation " >
                <h5 style={{color:'#fff'}}>Locate us</h5>
                        <div className="row" style={{marginTop:'25px'}}>
                       
                            <i className="material-icons" style={{color:'#fff',fontSize:'40px'}}>location_on</i>
                            <h5 style={{color:'#fff'}}>21, revolution street</h5>
                            <h5 style={{color:'#fff',marginLeft:'40px'}}>Paris,France</h5>
                           
                        </div>
                        <div className="row" style={{marginTop:'25px'}}>
                                                   
                        <i className="material-icons"style={{color:'#fff',fontSize:'40px'}}>call</i>
                            <h5 style={{color:'#fff'}}>+977 9851538501</h5>
                        </div>
                        <div className="row" style={{marginTop:'25px'}}>
                                                   
                        <i className="material-icons"style={{color:'#fff',fontSize:'40px'}}>email</i>
                            <h5 style={{color:'#fff'}}>paradise7@gmail.com</h5>
                        </div>
                </div>

                <div className="col-lg-2" style={{position:'relative'}}>
                <img src={logo} alt="" style={{marginBottom:'15px'}}/>
                

                <h2 style={{fontFamily:'Baloo Thambi, cursive',color:'#fff'}}>“When the customer comes first, the customer will last.”</h2>
                <p style={{color:'#fff'}}>-Robert Half</p>
                   
                </div>
             
                
                </div>
                    <div className="end" style={{backgroundColor:'',color:"gray"}}>
                        <h4 style={{textAlign:'center'}}> &copy; 2019 Paradise Resort</h4>
                    </div>
                </div>
        </div>
    )
}

export default Footer;