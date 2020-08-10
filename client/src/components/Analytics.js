import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
 
class Analytics extends Component {
   render() {
       return (
           <div>
               Analytics
           </div>

       );
   }
}

function mapStateToProps({user}) {

}
 
export default connect(mapStateToProps)(Analytics);