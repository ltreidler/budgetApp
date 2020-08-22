import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../actions';
import {withRouter} from 'react-router-dom';
import DatePicker from 'react-date-picker';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
 

//SOME SORT OF ERROR HERE! FIX IT
class NewItem extends Component {
   
   state = {
       label: "",
       date: new Date(),
       category: "",
       value: null,
       expense: true,
       text: "Enter a new item"
   }

   renderDropdown() {
       //finish this up
       const categoryArray = this.props.categories.map(({label}) => label);
       return (
            <div className="col s6">
                <Dropdown options={categoryArray} onChange={this.onSelect} value={this.state.category} placeholder="Select an option"/>
            </div>
       );

   }

   dateChange = date => this.setState({date});

   valueChange = ({target: {value}}) => this.setState({value: Math.abs(value)});

   labelChange = ({target: {value}}) => this.setState({label: value});

   categoryChange = ({value}) => this.setState({category: value});

   validate = () => {
        const {value, label, category} = this.state;  
        if(value <= 0 || label === "" || !category){
           return false;
        } 
        return true;
   }

   submit = async () => {
        let {expense, value, label, date, category} = this.state;
        if(this.validate()){
            if(expense) {
                value = -Math.abs(value);
            } else {
                value = Math.abs(value);
            }
            const {postItem, history} = this.props;
            postItem({value, label, date, category}, history);
        } else {
            this.setState({text: 'Please input valid entries'});
        }
   }

   toggleValue = () => this.state.expense ? this.setState({expense: false}) : this.setState({expense: true});

   onSelect = ({value}) => this.setState({category: value});

    renderFields() {
        return(
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <input id="label" type="text" onChange={this.labelChange} required/>
                        <label htmlFor="label">Item Name</label>
                    </div>
                    <div className="input-field col s3">
                        <input id="value" type="number" onChange={this.valueChange} required/>
                        <label htmlFor="value">Cost/Deposit</label>
                    </div>
                    <div className="input-field col s3">
                        <p>
                            <label>
                                <input name="group1" type="radio" onChange={this.toggleValue} defaultChecked/>
                                <span>Expense</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input name="group1" type="radio" onClick={this.toggleValue}/>
                                <span>Income</span>
                            </label>
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col s6">
                        <DatePicker 
                            onChange={this.dateChange}
                            value={this.state.date}
                        />
                    </div>
                    {this.renderDropdown()}
                </div>
                <button className="btn waves-effect waves-light" type="button" name="action" onClick={this.submit}>Submit
                    <i className="material-icons right">send</i>
                </button>
            </form>
        )
    }
    
   
    render() {
       const {history, postItem} = this.props;
       return (
        <div className="container">
            <h5 className="header center teal-text text-lighten-2">
                {this.state.text}</h5>
            <br></br>
            {this.renderFields()}
        </div>
       );
   }
}

function mapStateToProps({money}) {
    const {budget: {categories}} = money;
    return {categories};
}
 
export default withRouter(connect(mapStateToProps, actions)(NewItem));