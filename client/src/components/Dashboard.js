import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
 
class Dashboard extends Component {
   render() {
       return (
        <div id="index-banner" className="parallax-container">
            <div className="section no-pad-bot">
                <div className="container">
                    <br></br>
                    <h1 className="header center teal-text text-lighten-2">Hi {this.props.name.first}</h1>
                    <div className="row center">
                        <h5 className="header col s12 light">You have ${this.props.thisMonth} left in your monthly budget</h5>
                    </div>
                    <div className="row center">
                        <Link to="/budget" id="download-button" class="btn-large waves-effect waves-light teal lighten-1">Start Budgeting</Link>
                    </div>
                    <br></br>
                </div>
            </div>
        </div>
       );
   }
}

function mapStateToProps({user}) {
    const {name, thisMonth, total} = user;
    return {name, thisMonth, total};
}
 
export default connect(mapStateToProps)(Dashboard);