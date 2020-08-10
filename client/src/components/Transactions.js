import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
 
class Transactions extends Component {
   render() {
       return (
           <div>
               Transactions
           </div>

       );
   }
}

function mapStateToProps({user}) {

}
 
export default connect(mapStateToProps)(Transactions);