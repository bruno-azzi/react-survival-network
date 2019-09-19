import React from 'react';
import Routes from './routes';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#929292',
      light: '#929292',
      dark: '#929292',
      contrastText: '#ff7700',
      tonalOffset: 0.2,
      contrastThreshold: 3
    }
  }
});

const App = () => (
  // MATERIAL UI THEME

  <ThemeProvider theme={theme}> 
    <Routes />
  </ThemeProvider>
)

export default App;
