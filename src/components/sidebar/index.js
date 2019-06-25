import React from "react";
import { Link } from "react-router-dom";
import { ListGroup, Button } from 'react-bootstrap';
import { SideBarButton } from '../../components';
import './styles.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vizualization: 'sidebar-closed' 
    };
  }

  doLogout = () => {
      this.props.updateLoginStack();
  }

  render() {
      const {
          routes,
          visible,
          onClosed
      } = this.props;
      const vizualization = visible ? 'sidebar-opened' : 'sidebar-closed';

    return (
        <div className={`sidebar ${vizualization}`}>
            <div className="float-right">
                <SideBarButton action={onClosed} />
            </div>

            <ListGroup className="sidebar-options">
                <ListGroup.Item><Link to="/">{routes.home.name}</Link></ListGroup.Item>
                <ListGroup.Item><Link to="/newpost/">{routes.newPost.name}</Link></ListGroup.Item>
                <ListGroup.Item><Button onClick={this.doLogout} variant="Link">Logout</Button></ListGroup.Item>
            </ListGroup>
        </div>
    );
  }
}

export default Sidebar;