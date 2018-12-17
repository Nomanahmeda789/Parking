import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

class Button1 extends Component {
    render() {
        return (
            <div>
                <Button variant="contained"  onClick={this.props.handleOpen} style={{fontFamily:"Vidaloka",width:this.props.width1,height:this.props.height1,backgroundColor:this.props.bgcolor,color:"white",fontSize:(this.props.fonts)?this.props.fonts:"1.4em"}}
                >
                    {this.props.name}
                </Button>
            </div>
        );
    }

}

export default Button1;
