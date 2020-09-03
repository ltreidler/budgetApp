import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {ResponsivePie} from '@nivo/pie';
 
class Analytics extends Component {
   

   
    render() {
       return (
           <div>
               Analytics
           </div>
       );
   }
}

function mapStateToProps({user, money: {budget: {categories}}}) {
    return {categories};
}
 
export default connect(mapStateToProps)(Analytics);