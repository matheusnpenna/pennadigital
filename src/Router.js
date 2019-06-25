import React from "react";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { routes } from './config';
import { Auth } from './services';
import { Sidebar, SideBarButton } from './components';
import {
  HomeScreen,
  LoginScreen,
  NewPostScreen
} from './views';

class AppRouter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      sidebarVisualization: false
    };
    
    Auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ isLogged: true });
      }
    });
  }

  updateStackLogInOrOut = (isLogged) => this.setState({ isLogged });

  handleSideBar = () => {
    this.setState({ sidebarVisualization: !this.state.sidebarVisualization });
  }

  render() {
    const { isLogged, sidebarVisualization } = this.state;

    return (
      <Router>
        { isLogged ?
          <div className="container-logged">
              { 
                sidebarVisualization ? 
                  <Sidebar 
                    routes={routes}
                    visible={sidebarVisualization}
                    onClosed={this.handleSideBar}
                    updateLoginStack={this.updateStackLogInOrOut}
                  />
                    :
                  <div className="align-items-flexstart"><SideBarButton action={this.handleSideBar} /></div>
              }      
              <Route path={routes.home.path} exact render={(props) => <HomeScreen { ...props } updateLoginStack={this.updateStackLogInOrOut} />} />
              <Route path={routes.newPost.path} render={(props) => <NewPostScreen { ...props } updateLoginStack={this.updateStackLogInOrOut} />} />
              <Route render={() => <Redirect to="/"/>} />
          </div>
          :
            <div>
              <Route path={routes.login.path} exact render={(props) => <LoginScreen { ...props } updateLoginStack={this.updateStackLogInOrOut} />} />
              <Route render={() => <Redirect to="/login"/>} />
            </div>
        }
      </Router>
    );
  }
}

export default AppRouter;