import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

class LoginScreen extends React.Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Login
            </p>
          </header>
        </div> 
      );
    }
}

export default LoginScreen;
