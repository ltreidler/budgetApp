import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';
import Header from './Header';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  
  render(){
    return (
      <div className="App">
        <BrowserRouter>
          <Header />
          <div>
            <Route exact path="/" component={Landing} />
            <Route exact path="/dash" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  } 
}

export default connect(null, actions)(App);

