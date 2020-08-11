import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import profileFields from './profileFields';
import Field from './Field';
import {Link} from 'react-router-dom';

class ProfileForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email: this.props.email,
            first: this.props.first,
            last: this.props.last
        }
        // this.setLast = this.setLast.bind(this);
        // this.setFirst = this.setFirst.bind(this);
        // this.setEmail = this.setEmail.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange({target: {id, value}}){
        const {first, last, email} = profileFields;
        switch (id) {
            case first.id:
                this.setState({first: value});
                return;
            case last.id:
                this.setState({last: value});
                return;
            case email.id:
                this.setState({email: value});
                return;
        }
    }

    handleSubmit(){ 
        //make a post request to the backend, then go to the next page, SetupForm
        console.log('submit');
    }
    
    render() {
        const {first, last, email} = this.state;
        const {handleChange, handleSubmit} = this;
        return (
            <div className="row container">
            <h1 className="header center teal-text text-lighten-2">Welcome to Budget My Life</h1>
                <h5 className="header center teal-text text-lighten-2">Please check your name and email</h5>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="first" type="text" className="validate" value={first} onChange={handleChange}/>
                        </div>
                        <div className="input-field col s6">
                            <input id="last" type="text" className="validate" value={last} onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="email" type="email" value={email}className="validate" onChange={handleChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <Link to="/setup" className="btn waves-effect waves-light right" type="button" name="action" onClick={handleSubmit}>Submit
                            <i className="material-icons right">send</i>
                        </Link>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({user}){
    const { name: {first, last}, email } = user;
    return {first, last, email};
}

export default connect(mapStateToProps)(ProfileForm);