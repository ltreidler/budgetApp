import React from 'react';
import {Link} from 'react-router-dom';

export default function () {
    return ( <div className="container"><Link to="/newItem" className="btn-floating btn-large waves-effect waves-light red right"><i className="material-icons">add</i></Link></div>)
}