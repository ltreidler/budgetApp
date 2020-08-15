import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import profileFields from './profileFields';
import Field from './Field';
import {Link} from 'react-router-dom';

class Form extends Component {
    
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
        //render forms within this
        //would handleChange be called if anything inside the form changes?
        return (
            <div>
                
            </div>
        );
    }
}

function mapStateToProps({user}){
    const { name: {first, last}, email } = user;
    return {first, last, email};
}

export default connect(mapStateToProps)(Form);