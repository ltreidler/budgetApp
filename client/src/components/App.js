import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
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
import Footer from './Footer';
import EditBudget from './EditBudget';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser()
      .then(() => {
        if(this.props.user){
          this.props.fetchMoney();
        }
      })
  }

  renderContent(){
    let {user, money} = this.props;
    if(user === false){
      return <Landing />;
    } else if (money === null) {
      return (<Loader />);
    } else if(money === false) {
      return <Setup />;
    }
    return(
        <div>
            <Switch>
              <Route exact path="/dash" component={Dashboard} />
              <Route exact path="/budget" component={Budget} />
              <Route exact path="/analytics" component={Analytics} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/transactions" component={Transactions} />
              <Route exact path="/newItem" component={NewItem} />
              <Route exact path="/editBudget" component={EditBudget} />
              <Route exact path="/setup" render={() => {
                if(money === false) {
                  console.log('user is new');
                  return <Setup />;
                } else {
                  return <Redirect to="/" />
                }
              }} />
              <Route path="/" render={() => {
                return (user ? <Redirect to="/dash"/> : <Redirect to="/" />);
              }} />
            </Switch>
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

