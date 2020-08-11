import React, { Component } from 'react';
import { connect } from 'react-redux';


class SetupForm extends Component {
    
    
    render() {
        const {first, last, email} = this.props;
        return (
            <div className="row container">
                <h5 className="header center teal-text text-lighten-2">Let's set up</h5>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="accountName" type="text" className="validate" value=""/>
                            <label htmlFor="account">Account Name</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="accountVal" type="number" className="validate" value=""/>
                            <label htmlFor="account">Account Value</label>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({user}){
    const {name: {first, last}, email} = user;
    return {first, last, email};
}

export default connect(mapStateToProps)(SetupForm);