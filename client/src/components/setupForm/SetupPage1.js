import React, {Component} from 'react';
import { reduxForm, Field } from 'redux-form';
import SetupField from './SetupField';
import _ from 'lodash';
import validateEmail from '../../utils/validateEmail';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';




class SetupPage1 extends Component {


    renderFields(){
        const PROFILE_FIELDS =[
            {label: "First Name", name:"first", value: this.props.first},
            {label: "Last Name", name:"last", value: this.props.last},
            {label: "Email", name:"email", value: this.props.email}
        ]

        return _.map(PROFILE_FIELDS, ({label, name, value}) => {
            return (<Field key={name} component={SetupField} type="text" label={label} name={name} placeholder={value}/>)
        });
    }
    
    render(){
        return (
            <div className="container">
                <h5 className="header center teal-text text-lighten-2">First, please check your account details</h5>
                <form onSubmit={this.props.handleSubmit(this.props.onNextPage)}>
                    {this.renderFields()}
                    <button className="teal btn-flat right white-text" type="submit">
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                    <Link to="/dash" className="btn-flat left white-text red">
                        Cancel
                        <i className="material-icons right">cancel</i>
                    </Link>
                </form>              
            </div>
        );
    }
}

function validate({firstName, lastName, email}) {
    const errors = {};
    //errors automatically passed to corresponding fields
    if(!firstName) {
        errors.firstName = "You must provide a first name";
    }
    if(!lastName){
        errors.lastName = "You must provide a last name";
    }
    if(!validateEmail(email)){
        errors.email = "You must provide a valid email";
    }
    //if empty, reduxForm assumes everything is valid
    return errors;
}

function mapStateToProps({user}){
    //what I NEED to do is set the form values from the start!!!
    return {
        initialValues: {
        first: user.name.first,
        last: user.name.last,
        email: user.email,
        accountValue: 0,
        debt: 0
    }}
}

export default connect(mapStateToProps)(reduxForm({
    //ran everytime user submits the form
    validate,
    form: 'setupForm',
    destroyOnUnmount: false
})(SetupPage1));