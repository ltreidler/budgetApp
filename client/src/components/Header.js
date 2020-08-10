import React, {Component} from 'react';
import M from 'materialize-css';  
import {Link} from 'react-router-dom';
 

class Header extends Component {
   
    componentDidMount() {
        let elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {inDuration: 300, outDuration: 225});
    }
   
    render() {
       return (
           <div>
              <nav>
                <div className="nav-wrapper container">
                    <Link to="/" className="brand-logo">Budget My Life</Link>
                    <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                    <ul className="right hide-on-med-and-down">
                        <li><Link to="/dash">Sign In</Link></li>
                        <li><Link to="/dash">Dashboard</Link></li>
                    </ul>
                </div>
            </nav>
            <ul className="sidenav" id="mobile-demo">
                <li><Link to="/dash">Dashboard</Link></li>
            </ul>
        </div>
       );
   }
}
 
export default Header;