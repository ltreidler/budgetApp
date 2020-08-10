import React, {Component} from 'react';
import M from 'materialize-css';  
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
 

class Header extends Component {
   
    componentDidMount() {
        let elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {inDuration: 300, outDuration: 225});
    }

    renderContent() {
        //finds out if the user is logged in
        //if null, show nothing
        //if logged in, show dashboard

        switch(this.props.user){
            case null:
                return;
            case false:
                return(
                    <li><a href='/auth/google'>Sign In</a></li>
                );
            default:
                return(
                    <div>
                        <li><Link to='/dash'>Dashboard</Link></li>
                        <li><a href='/api/logout'>Logout</a></li>
                    </div>
                );
        }

    }
   
    render() {
       return (
           <div>
              <nav>
                <div className="nav-wrapper container">
                    <Link to="/" className="brand-logo">Budget My Life</Link>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                {this.renderContent()}
            </ul>
        </div>
       );
   }
}
 
function mapStateToProps({ user }){
    //returns { user: user }
    return { user };
}

export default connect(mapStateToProps)(Header);