import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
 
class EditBudget extends Component {
   render() {
       return (
           <div>
               Edit Budget
           </div>

       );
   }
}

function mapStateToProps({user}) {

}
 
export default connect(mapStateToProps)(EditBudget);