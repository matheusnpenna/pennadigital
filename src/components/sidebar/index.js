import React from "react";
import { Link } from "react-router-dom";
import { SideBarButton } from '../../components';
import './styles.css';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vizualization: 'sidebar-closed' 
    };
  }

  render() {
      const { routes, visible, onClosed } = this.props;
      const vizualization = visible ? 'sidebar-opened' : 'sidebar-closed';

    return (
        <div className={`sidebar ${vizualization}`}>
            <div className="float-right">
                <SideBarButton action={onClosed} />
            </div>
            <ul className="sidebar-options">
                <li>
                    <Link to="/">{routes.home.name}</Link>
                </li>
                <li>
                    <Link to="/newpost/">{routes.newPost.name}</Link>
                </li>
            </ul>
        </div>
    );
  }
}

export default Sidebar;