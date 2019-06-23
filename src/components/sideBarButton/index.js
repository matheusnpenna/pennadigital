import React from 'react';
import { Button, Image } from 'react-bootstrap';
import './styles.css';
import { assets } from '../../config';

class SideBarButton extends React.Component {
    render(){
        return (
            <Button variant="link" onClick={this.props.action}>
                <Image className="menu-icon" src={assets.icons.menu} rounded/>
            </Button>
        );
    }
}

export default SideBarButton;