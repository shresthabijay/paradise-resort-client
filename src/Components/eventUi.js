import React from 'react';
import Modal from 'react-responsive-modal';
import modalimg from '../assets/place1.jpg';


class Ui extends React.Component{
    constructor(){
        super();

        this.state = {
            open: false,
            
          };
         
     
    }
    onOpenModal = () => {
        this.setState({ open: true });
      };
    
      onCloseModal = () => {
        this.setState({ open: false });
      };

    
    render(){
        const {data} =this.props;
    return(
        <div className="event-data">
        <div className="card  card1"  key={data.id}>
 
        <div className="card-body">
            <h2 className="card-header" style={{textAlign:'center',color:'teal',fontFamily:"Charm,cursive"}} >{data.Event_name}</h2>
    
            <p className="card-text">{data.description}</p>
            <button type="button" className="btn btn-outline-secondary" onClick={this.onOpenModal}>View</button>
        </div>
        </div>
        <Modal open={this.state.open} onClose={this.onCloseModal} center>
          <h2 style={{fontFamily:'Charm, cursive',color:'#000',textAlign:'center'}}>{data.Event_name}</h2>
          <img src={modalimg} alt="" style={{width:'100%'}}/>

            <p>{data.description}</p>
        </Modal>
        </div>
    )
}

}

export default Ui;