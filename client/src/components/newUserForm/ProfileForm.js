import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class ProfileForm extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            email: this.props.email,
            first: this.props.first,
            last: this.props.last
        }
        this.setLast = this.setLast.bind(this);
        this.setFirst = this.setFirst.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setLast({target}){
        //when something changes, 
        this.setState({last: target.value});
    }

    setFirst({target}){
        //when something changes, 
        this.setState({first: target.value});
    }

    setEmail({target}){
        //when something changes, 
        this.setState({email: target.value});
    }

    handleSubmit(){
        const {first, last, email} = this.props;
        const user = {first, last, email};
        if(_.isEqual(this.state, user)){
            console.log('no change');
        }
    }



    
    render() {
        const {first, last, email} = this.state;
        return (
            <div className="row container">
                <h5 className="header center teal-text text-lighten-2">Please check your name and email</h5>
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                            <input placeholder="Placeholder" id="first_name" type="text" className="validate" value={first} onChange={this.setFirst}/>
                        </div>
                        <div className="input-field col s6">
                            <input id="last_name" type="text" className="validate" value={last} onChange={this.setLast}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="email" type="email" value={email}className="validate" onChange={this.setEmail}/>
                        </div>
                    </div>
                    <div className="row">
                        <button className="btn waves-effect waves-light right" type="button" name="action" onClick={this.handleSubmit}>Submit
                            <i className="material-icons right">send</i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps({user}){
    const { name: {first, last}, email } = user;
    return {first, last, email}
}

export default connect(mapStateToProps)(ProfileForm);