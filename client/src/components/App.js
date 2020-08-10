import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './Landing';
import Header from './Header';
import Dashboard from './Dashboard';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div>
          <Route exact path="/" component={Landing} />
          <Route exact path="/dash" component={Dashboard} />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
