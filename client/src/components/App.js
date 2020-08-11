import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Analytics from './Analytics';
import Budget from './Budget';
import Dashboard from './Dashboard';
import Header from './Header';
import Landing from './Landing';
import Loader from './Loader';
import Profile from './Profile';
import Transactions from './Transactions';
import ProfileForm from './newUserForm/ProfileForm';
import SetupForm from './newUserForm/SetupForm';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderContent(){
    switch(this.props.user){
      case null:
        return (<Loader />);
      case false:
        return (<Landing />);
      default:
        return(
            <div>
              <Route exact path="/" component={Landing} />
              <Route exact path="/dash" component={Dashboard} />
              <Route exact path="/budget" component={Budget} />
              <Route exact path="/analytics" component={Analytics} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/transactions" component={Transactions} />
              <Route exact path="/newUser" component={ProfileForm} />
              <Route exact path="/setup" component={SetupForm} />
            </div>
        );
    }
  }
  
  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Header />
          {this.renderContent()}
        </div>
      </BrowserRouter>
    );
  } 
}

function mapStateToProps({ user }) {
  return { user }; //aka {user: user}
}

export default connect(mapStateToProps, actions)(App);

