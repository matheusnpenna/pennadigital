import React from 'react';
import logo from '../../logo.svg';
import '../../App.css';

class NewPost extends React.Component {
    render() {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              NewPost
            </p>
          </header>
        </div> 
      );
    }
}

export default NewPost;
