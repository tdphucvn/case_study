import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';


// create custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#009788',
    },
  },
  typography: {
    fontWeightRegular: 'lighter',
  }
});

// presisting data in localStorage
let persistor = persistStore(store);

ReactDOM.render(
    <ThemeProvider theme={theme}>
          <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                  <App />
              </PersistGate>
          </Provider>
    </ThemeProvider>,
  document.getElementById('root')
);
