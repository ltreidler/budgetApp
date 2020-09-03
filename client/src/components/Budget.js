import React, {Component} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Category from './Category';
import {Line} from 'rc-progress';
import {Link} from 'react-router-dom'
import Popup from 'reactjs-popup';
import * as actions from '../actions';
import {ResponsivePie} from '@nivo/pie';
import BudgetPie from './charts/BudgetPie';
import SpentPie from './charts/SpentPie';
 
class Budget extends Component {

    state = {
        edited: {max: null, category: null},
        original: {max: null, category: null},
        newCategory: {max: null, category: null, color: null}
    }


    category({label, spent, max, percent, color}) {
        return (
        <div className="row">
            <div className="col s12 m12">
              <div className={"card-panel "+color} 
                    onClick={() => {this.setState({edited: {max, category: label}, original: {max, category: label}})}}>
                <span className="white-text">{label}: {spent} / {max} </span>
                <Line percent={percent} strokeWidth="3" trailWidth="3" strokeColor="#ffffff" trailColor="#000000"/>
              </div>
            </div>
          </div>);
    }

    postEdit() {
        //send state to editCategory from this.props
        //reset state
        const {edited, original} = this.state;
        console.log(edited);
        if(edited.max && !(edited.max == original.max)) {
            this.props.editCategory(edited);
        }
        this.setState({edited: {max: null, category: null}, original: {max: null, category: null}});
    }

    addCategory() {
        const {newCategory} = this.state;
        const {max, category, color} = newCategory;
        if(max && category && color) {
            this.props.createCategory(this.state.newCategory);
        }
    }

    renderCategories() {
        const {categories} = this.props;
        const {edited} = this.state;
        return _.map(categories, ({max, spent, label, color}) => {
            let percent = (spent/max)*100;
            return (
                <div key={label}>
                    <Popup trigger={this.category({label, spent, max, percent, color})} 
                        modal 
                        closeOnDocumentClick 
                        onClose={() => {this.postEdit()}} > 
                                {label} max:
                                <input type="number" defaultValue={edited.max} onChange={(e) => this.setState({edited: {max: parseInt(e.target.value), category: label}})}></input>
                    </Popup>
                </div>
            
            );
        });
    }

    render() {
        const {spentThisMonth, earnedThisMonth, total, totalIncome} = this.props;
        return (
        <div className="container">
        <div className="row">
            <div className="col s6"><BudgetPie /></div>
            <div className="col s6"><SpentPie /></div>
        </div>
            <div className="row center">
                <h5 className="header col s12 light">Your budget this month is ${total} </h5>
                <h5 className="header col s12 light">{`You've spent $${spentThisMonth} and earned $${earnedThisMonth}`} </h5>
            </div>
            <div className="row">
                <div className="col s12 m12">
                <div className="card-panel yellow">
                    <span className="white-text">Income: {earnedThisMonth} / {totalIncome} </span>
                    <Line percent={(earnedThisMonth/totalIncome)*100} strokeWidth="3" trailWidth="3" strokeColor="#ffffff" trailColor="#000000"/>
                </div>
                </div>
            </div>
            {this.renderCategories()}
            <Popup trigger={<div className="container"><button className="btn-floating btn-large waves-effect waves-light red right"><i className="material-icons">add</i></button></div>}
                            modal
                            closeOnDocumentClick
                            onClose={() => {this.addCategory()}}>
                                <form>
                                    Enter new category:
                                    <input type="text" onChange={(e) => this.setState({newCategory: {max: this.state.newCategory.max, category: e.target.value, color: this.state.newCategory.color}})}></input>
                                    Enter max value:
                                    <input type="number" onChange={(e) => this.setState({newCategory: {max: parseInt(e.target.value), category: this.state.newCategory.category, color: this.state.newCategory.color}})}></input>
                                    Enter color:
                                    <input type="text" onChange={(e) => this.setState({newCategory: {max: this.state.newCategory.max, category: this.state.newCategory.category, color: e.target.value}})}></input>
                                </form>
                                
                            </Popup>
        </div>
        
            

       );
   }
}
 
function mapStateToProps({money: {budget: {categories, total}, spentThisMonth, earnedThisMonth, totalIncome }}){
    return {categories, total, spentThisMonth, earnedThisMonth, totalIncome};
}

export default connect(mapStateToProps, actions)(Budget);