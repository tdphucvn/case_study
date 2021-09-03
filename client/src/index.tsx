import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import { Provider } from 'react-redux';
import { store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { CookiesProvider } from 'react-cookie';

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

let persistor = persistStore(store);

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <CookiesProvider>
          <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                  <App />
              </PersistGate>
          </Provider>
      </CookiesProvider>
    </ThemeProvider>,
  document.getElementById('root')
);
