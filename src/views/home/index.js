import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

class HomeScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      
    }
  }
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Home
            </p>
          </header>
        </div> 
      );
    }
}

export default HomeScreen;
