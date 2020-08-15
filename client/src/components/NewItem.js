import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import * as actions from '../actions';
import {withRouter} from 'react-router-dom';
import DatePicker from 'react-date-picker';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
 
class NewItem extends Component {
   
   state = {
       label: "",
       date: new Date(),
       category: "",
       value: null
    //    cost: true
   }

   renderDropdown() {
       //finish this up
       const categoryArray = this.props.categories.map(({label}) => label);
       return (
            <div className="col s6">
                <Dropdown options={categoryArray} onChange={this.onSelect} value={this.state.category} placeholder="Select an option" />
            </div>
       );

   }

   dateChange = date => this.setState({date});

   valueChange = ({target: {value}}) => this.setState({value: Math.abs(value)});

   labelChange = ({target: {value}}) => this.setState({label: value});

   categoryChange = ({value}) => this.setState({category: value});

   submit = () => {
       const {postItem, history} = this.props;
       postItem(this.state, history);
   }

   makeInc = () => this.setState({cost: false});

   makeCost = () => this.setState({cost: true});

   onSelect = ({value}) => this.setState({category: value});

    renderFields() {
        return(
            <form className="col s12">
                <div className="row">
                    <div className="input-field col s6">
                        <input id="label" type="text" onChange={this.labelChange}/>
                        <label htmlFor="label">Item Name</label>
                    </div>
                    <div className="input-field col s3">
                        <input id="value" type="number" onChange={this.valueChange}/>
                        <label htmlFor="value">Cost/Deposit</label>
                    </div>
                    {/* <div className="input-field col s3">
                        <p>
                            <label>
                                <input name="group1" type="radio" onClick={this.makeCost}/>
                                <span>+</span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input name="group1" type="radio" onClick={this.makeInc}/>
                                <span>-</span>
                            </label>
                        </p>
                    </div> */}
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
                Enter a new item</h5>
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