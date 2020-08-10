import React, {Component} from 'react';
 
class Landing extends Component {
   render() {
       return (
            <div id="index-banner" className="parallax-container">
                <div className="section no-pad-bot">
                    <div className="container">
                        <br></br>
                        <h1 className="header center teal-text text-lighten-2">Budget My Life</h1>
                        <div className="row center">
                            <h5 className="header col s12 light">Manage your money better</h5>
                        </div>
                        <div className="row center">
                            <a href="/auth/google" id="download-button" class="btn-large waves-effect waves-light teal lighten-1">Get Started</a>
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
       );
   }
}
 
export default Landing;