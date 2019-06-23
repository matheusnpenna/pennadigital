import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { routes } from './config';
import { Auth } from './services';
import {
  HomeScreen,
  LoginScreen,
  NewPostScreen
} from './views';

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

  updateStackLogInOrOut = (isLogged) => this.setState({ isLogged });

  render() {
    const { isLogged } = this.state;

    return (
      <Router>
        { isLogged ?
           <div className="container-logged">
              <div className="sidebar">
                <ul className="sidebar-options">
                  <li>
                    <Link to="/">{routes.home.name}</Link>
                  </li>
                  <li>
                    <Link to="/newpost/">{routes.newPost.name}</Link>
                  </li>
                </ul>
              </div>
            
              <Route path={routes.home.path} exact render={(props) => <HomeScreen { ...props } updateLoginStack={this.updateStackLogInOrOut} />} />
              <Route path={routes.newPost.path} render={(props) => <NewPostScreen { ...props } updateLoginStack={this.updateStackLogInOrOut} />} />
            </div>
         :
            <Route path={routes.login.path} exact render={(props) => <LoginScreen { ...props } updateLoginStack={this.updateStackLogInOrOut} />} />
        }
      </Router>
    );
  }
}

export default AppRouter;