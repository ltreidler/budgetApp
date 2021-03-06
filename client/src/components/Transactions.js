import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
import Popup from 'reactjs-popup';
import * as actions from '../actions';
 
class Transactions extends Component {
   
    state = {
        label: "",
        value: "",
        place: "",
        id: ""
    }

    postEdit(){
        this.props.editItem(this.state);
    }

   renderTransactions() {
       //choose color based on category
            //go through categories and get the array of label, color
       //iterate over every item from the money object and take label, date, value, category
            //match category to color using the array
        const {money} = this.props;
        const colorArray = money.budget.categories.map(({color, label}) => {return {color, label}});

        const markup = money.items.map(({label, date, category, value, place, _id}) => {
            if(label && date && value) {
                let color = "orange";

                //goes through color array
                //if the color element's category label matches the category of the item
                //then set the color of the item to the color of the category
                _.each(colorArray, el => {
                    if(el.label == category) {
                        color = el.color;
                    }
                });
                if(!category) {
                    color = "green";
                }

                return (
                    <Popup trigger={this.transaction(color, label, value, date, category, place)}
                            modal
                            closeOnDocumentClick
                            onOpen={() => this.setState({id: _id})}
                            onClose={() => this.postEdit()}>
                            <label htmlFor="label">Name</label>
                            <input name="label" type="text" defaultValue={label} onChange={({target: {value}}) => this.state.label = value}></input> 
                            <label htmlFor="value">Value</label>
                            <input name="value" type="number" defaultValue={value} onChange={({target: {value}}) => this.state.value = value}></input> 
                            <label htmlFor="place">Place</label>
                            <input name="place" type="text" defaultValue={place} onChange={({target: {value}}) => this.state.place = value}></input>
                    </Popup>
                    );
            }
        });
        return markup;
   }

   transaction(color, label, value, date, category, place) {
       date = new Date(date);
       return (<tr className={color + " lighten-2"}>
                    <td>{label}</td>
                    <td>${Math.abs(value)}</td>
                    <td>{date.toLocaleDateString()}</td>
                    <td>{category}</td>
                    <td>{place}</td>
                </tr>);
   }
   
    render() {
        //choose color based on 
        return (
            <div className="container">
                    <table className="striped">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Price</th>
                                <th>Item Date</th>
                                <th>Item Category</th>
                                <th>Place</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderTransactions()}
                        </tbody>
                    </table>
                <button className="resort" onClick={this.props.resortItems}>RESORT</button>
            </div>
        )
        
   }

}

function mapStateToProps({user, money}) {
    return {user, money};
}
 
export default connect(mapStateToProps, actions)(Transactions);