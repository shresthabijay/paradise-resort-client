import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React,{Component} from "react"
import { ClipLoader } from 'react-spinners';

export default class ModalCustom extends Component{
    constructor(props) {
      super(props)
    
      this.state = {
         showLoader:false
      };
    };

    showLoader=()=>{
        this.setState({showLoader:true})
    }

    hideLoader=()=>{
        this.setState({showLoader:false})
    }


    
    render(){
        let {data,toggle}=this.props
        let newProps={showLoader:this.showLoader,hideLoader:this.hideLoader,data,toggle}
        const childrenWithProps = React.Children.map(this.props.children, child =>{
            return React.cloneElement(child,this.props.passProps===false?null:newProps)
        }
        );

        return (
                <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} size="lg" contentClassName={this.props.className}>
                    <div className="card p-0" style={{overflow:"hidden",border:"none"}}>
                        <div className="adminPageHeader">{this.props.title}</div>
                        <div className="adminFormMain">
                            {this.state.showLoader &&
                                <div className="adminFormLoader" onScroll={(e)=>{e.preventDefault()}}>
                                    <ClipLoader
                                            sizeUnit={"px"}
                                            size={40}
                                            color={'#123abc'}
                                            loading={this.state.showLoader}
                                    />
                                </div>
                            }
                            {
                                childrenWithProps
                            }
                        </div>
                        
                    </div>
                </Modal>
        )
    }
    
}