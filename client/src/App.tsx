import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import RestrictedRoute from './routes/RestrictedRoute';


import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotePage from './pages/NotePage';


const App = () => {
  return (
    <>
    <Router>
      <Switch>
        <RestrictedRoute exact path="/login" component={LoginPage} />
        <RestrictedRoute exact path="/signup" component={SignUpPage} />
        <Route path="/" component={NotePage} />
      </Switch>
    </Router>
    </>
  );
};

export default App;