import React, { Component } from 'react';
import { connect } from 'react-redux';

class SetupForm extends Component {
    
    
    render() {
        const {first, last, email} = this.props;
        return (
            <div className="row container">
                <h5 className="header center teal-text text-lighten-2">Please check your name and email</h5>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Placeholder" id="first_name" type="text" className="validate" value={first}/>
                        </div>
                        <div className="input-field col s6">
                            <input id="last_name" type="text" className="validate" value={last}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="email" type="email" value={email}className="validate"/>
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn waves-effect waves-light right" type="submit" name="action">Submit
                            <i className="material-icons right">send</i>
                        </button>
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