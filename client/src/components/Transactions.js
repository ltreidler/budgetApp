import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import _ from 'lodash';
 
class Transactions extends Component {
   
   renderTransactions() {
       //choose color based on category
            //go through categories and get the array of label, color
       //iterate over every item from the money object and take label, date, value, category
            //match category to color using the array
        const {money} = this.props;
        const colorArray = money.budget.categories.map(({color, label}) => {return {color, label}});

        const markup = money.items.map(({label, date, category, value, place}) => {
            if(label && date && value) {
                let color = "orange";
                console.log(category);
                console.log(category);
                _.each(colorArray, el => {
                    if(el.label == category) {
                        color = el.color;
                    }
                });
                if(!category) {
                    color = "green";
                }
                return this.transaction(color, label, value, date, category, place);
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
                
            </div>
        )
        
   }
}

function mapStateToProps({user, money}) {
    return {user, money};
}
 
export default connect(mapStateToProps)(Transactions);