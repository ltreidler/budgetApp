import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
 
class Profile extends Component {
   render() {
       return (
           <div>
               Profile
           </div>

       );
   }
}

function mapStateToProps({user}) {

}
 
export default connect(mapStateToProps)(Profile);