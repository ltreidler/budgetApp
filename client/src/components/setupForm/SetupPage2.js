import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import SetupField from './SetupField';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import {withRouter} from 'react-router-dom';

class SetupPage2 extends Component {

    renderAccount() {
        return (
            <div className="row">
                <div className="input-field col s8">
                    <Field key="accountName" component={SetupField} type="text" label="Account Name" name="accountName" />
                </div>
                <div className="input-field col s4">
                    <Field key="accountValue" component={SetupField} type="number" label="Account Value" name="accountValue" placeholder={0}/>
                </div>
            </div>
        );
    }

    render() {
        const { history, setupUser, formValues, onPrevPage, first } = this.props;
        return (
            <div className="container">
            <h5 className="header center teal-text text-lighten-2">Thank you, {first}. </h5>
            <h5 className="header center teal-text text-lighten-2">Now please add your banking details</h5>
            <form className="col s12">
                
                {this.renderAccount()}

                <div className="row">
                    <div className="input-field col s4">
                        <Field key="debt" component={SetupField} type="number" label="Total Debt" name="debt" placeholder={0}/>
                    </div>

                    
                </div>
                <div className="row container">
                    <button className="btn-flat left white-text yellow" type="button" onClick={onPrevPage}>Back</button>
                    <button className="teal btn-flat right white-text" type="button" onClick={() => setupUser(formValues, history)}>
                        Next
                        <i className="material-icons right">done</i>
                    </button>
                </div>

            </form>  
            </div> 
            
        )
    }
}

function validate({accountName, accountValue, debt}) {
    const errors = {};
    //errors automatically passed to corresponding fields
    if(!accountName) {
        errors.accountName = "You must provide a first name";
    }
    if(!accountValue && accountValue !== 0){
        errors.accountValue = "You must provide a value";
    }
    if(!debt && debt !== 0){
        errors.debt = "You must provide a value";
    }
    //if empty, reduxForm assumes everything is valid
    return errors;
}

function mapStateToProps(state){
    const {user: {name: {first}}, form} = state;
    return {first, formValues: form.setupForm.values};
}

export default withRouter(connect(mapStateToProps, actions)(reduxForm({
    //ran everytime user submits the form
    form: 'setupForm',
    validate,
    destroyOnUnmount: false
})(SetupPage2)));
