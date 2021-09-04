import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import RestrictedRoute from './routes/RestrictedRoute';


import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotePage from './pages/NotePage';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { getNotes } from './redux/reducers/notes';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  dispatch(getNotes(accessToken))
      .then(res => console.log(res))
      .catch(err => console.log(err));

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