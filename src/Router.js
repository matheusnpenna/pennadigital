import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { routes } from './config';
import { Auth } from './services';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false 
    };
    
    Auth.onAuthStateChanged(function(user) {
      if (user) {
        this.setState({ isLogged: true });
      }
    });
  }

  render() {
    const { isLogged } = this.state;
    return (
      <Router>
        { isLogged ?
           <div>
              <div className="sidebar">
                <ul>
                  <li>
                    <Link to="/">{routes.home.name}</Link>
                  </li>
                  <li>
                    <Link to="/newpost/">{routes.newPost.name}</Link>
                  </li>
                </ul>
              </div>
            
              <Route path={routes.home.path} exact component={routes.home.component} />
              <Route path={routes.newPost.path} component={routes.newPost.component} />
            </div>
         :
            <Route path={routes.login.path} exact component={routes.login.component} />
        }
      </Router>
    );
  }
}

export default AppRouter;