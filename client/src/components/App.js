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
// import ProfileForm from './newUserForm/ProfileForm';
import Setup from './setupForm/Setup';
import NewItem from './NewItem';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
      .then(() => {
        console.log('user fetched');
        if(this.props.user){
          this.props.fetchMoney();
        }
      })
  }

  renderContent(){
    let {user, money} = this.props;
    // if(user === null || money === null) {
    //   return (<Loader />);
    // } else if (user === false) {
    //   return (<Landing />);
    // }
    if(user === false){
      return (<Landing />);
    } else if (money === null) {
      return (<Loader />)
    } else if(money === false) {
      return (<Route exact path="/setup" component={Setup} />);
    }
    return(
            <div>
              <Route exact path="/" component={Landing} />
              <Route exact path="/dash" component={Dashboard} />
              <Route exact path="/budget" component={Budget} />
              <Route exact path="/analytics" component={Analytics} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/transactions" component={Transactions} />
              <Route exact path="/newItem" component={NewItem} />
            </div>
      );
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

function mapStateToProps({ user, money }) {
  return { user, money }; //aka {user: user}
}

export default connect(mapStateToProps, actions)(App);

