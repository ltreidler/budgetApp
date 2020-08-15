import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SetupPage1 from './SetupPage1';
import SetupPage2 from './SetupPage2';

class Setup extends Component {
    
    state = {
        page: 1
    }

    next(){
        this.setState({page: this.state.page + 1});
    }

    prev(){
        this.setState({page: this.state.page - 1});
    }

    submit = (values) => {
        console.log(values);
    }

    renderContent() {
        if(this.state.page === 1) {
            return <SetupPage1  onNextPage={() => this.next()}/>
        } 
        return <SetupPage2 onPrevPage={() => this.prev()}/>
    }
    
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )
    }
}


export default (reduxForm({
    form: 'setup'
})(Setup));