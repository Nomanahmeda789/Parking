import React, { Component } from 'react';
import './App.css';
import Main from './components/Main.js'
import Student from './components/Student'
import Signup from './components/Signup'
import Admin from './components/Admin'

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      // <div>
      // <Student />
      // <Admin />
      // <Main />
      //     <Signup />
      // </div> 

      <Router history={this.props.history}>
        <div>
          <Route exact path="/" component={Main} />
          <Route path="/signup" component={Signup} />
          <Route path="/Student" component={Student} />
          <Route path="/Admin" component={Admin} />
        </div>
      </Router>
    );
  }
}

export default App;
