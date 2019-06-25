import React from 'react';
import { Card, Button } from 'react-bootstrap';
import './styles.css';

class SimpleCard extends React.Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        const { title, text } = this.props;
        return (
            <Card style={{ width: '18rem' }}>
                {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                <Card.Body>
                    <Card.Title className="text-dark">{title}</Card.Title>
                    <Card.Text className="text-dark">{text}</Card.Text>
                    <Button variant="primary">Ver Posts</Button>
                </Card.Body>
            </Card>
        );
    }

}

export default SimpleCard;