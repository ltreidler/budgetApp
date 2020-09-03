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

        const markup = money.items.map(({label, date, category, value}) => {
            if(label && date && value) {
                let color = "orange";
                console.log(category);
                _.each(colorArray, el => {
                    console.log(el.label);
                    if(el.label == category) {
                        color = el.color;
                    }
                });
                return (
                    <div>
                        {this.transaction(color, label, value, date, category)}
                    </div>
                )
            }
        });
        return markup;
   }

   transaction(color, label, value, date, category) {
       return (
            <div className="row" >
                <div className="col s12 m12">
                <div className={"card-panel "+color}>
                    <span className="white-text">{label}: ${value} on {date} of category {category}</span>
                </div>
                </div>
            </div>);
   }
   
    render() {
        //choose color based on 
        return (
            <div className="container">
                {this.renderTransactions()}
            </div>
        )
        
   }
}

function mapStateToProps({user, money}) {
    return {user, money};
}
 
export default connect(mapStateToProps)(Transactions);