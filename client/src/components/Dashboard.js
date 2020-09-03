import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import Footer from './Footer';
 
class Dashboard extends Component {
    
    renderStatus(){
        const {total, spentThisMonth} = this.props;
        if(total + spentThisMonth < 0) {
            return `You're $${(spentThisMonth - total)} over budget`;
        } else {
            return `You have $${total - spentThisMonth} remaining this month`;
        }
    }
   
    render() {
       const {first} = this.props;
       return (
        <div id="index-banner" className="parallax-container">
            <div className="section no-pad-bot">
                <div className="container">
                    <br></br>
                    <h1 className="header center teal-text text-lighten-2">Hi {first}</h1>
                    <div className="row center">
                        <h5 className="header col s12 light">{this.renderStatus()} </h5>
                    </div>
                    <div className="row center">
                        <Link to="/budget" id="download-button" class="btn-large waves-effect waves-light teal lighten-1">Start Budgeting</Link>
                    </div>
                    <br></br>
                    <Footer />
                </div>
            </div>
        </div>
       );
   }
}

function mapStateToProps({user, money}) {
    const {name: {first}} = user;
    const {spentThisMonth, budget: {total}} = money;
    return {first, spentThisMonth, total};
}
 
export default connect(mapStateToProps)(Dashboard);