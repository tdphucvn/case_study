import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import RestrictedRoute from './routes/RestrictedRoute';

import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import NotePage from './pages/NotePage';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './redux/store';
import { getNotes, cleanNotes } from './redux/reducers/notes';
import { unauthorized } from './redux/reducers/authenticate';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { accessToken } = useSelector((state: RootState) => state.auth);

  // get the notes from the database on page load and store them in redux for easier access
  dispatch(getNotes(accessToken))
      .then((res: any) => {
        const { status } = res.payload;
        // if the response status is 401 clear stored data in redux
        if(status === 401) {
          dispatch(unauthorized());
          dispatch(cleanNotes());
        };
      })
      .catch(err => console.log(err.response));

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