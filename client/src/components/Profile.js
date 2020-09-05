import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../actions';
 
class Profile extends Component {
   
    state = {
        accountValue: null
    }
   
    postProfile(){
        this.props.editProfile(this.state);
    }

    render() {
        const {accounts} = this.props;
       return (
           <div className="container">
                <label htmlFor="accountValue">{accounts[0].label}</label>
               <input name="accountValue" type="number" defaultValue={accounts[0].value} onChange={({target: {value}}) => this.setState({accountValue: value})}></input>
               <Link to="/dash" onClick={()=>this.postProfile()}>submit</Link>
           </div>
       );
   }
}

function mapStateToProps({money: {accounts}}) {
    return {accounts};
}
 
export default connect(mapStateToProps, actions)(Profile);