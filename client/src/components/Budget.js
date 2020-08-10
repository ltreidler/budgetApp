import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
 
class Budget extends Component {
   render() {
       return (
           <div>
               Budget
           </div>

       );
   }
}

function mapStateToProps({user}) {

}
 
export default connect(mapStateToProps)(Budget);