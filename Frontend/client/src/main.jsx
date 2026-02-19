import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { ThemeProvider , createTheme } from '@mui/material';
import CssBaseline from '@mui/material';

const theme = createTheme({});
const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme = {theme}>
        <CssBaseline />
        <AuthProvider >
          <App />
         </AuthProvider> {/*by wrapping the entire app component within AuthProvider makes the authentication context(user,loading,login,logout) for every components  */}
      </ThemeProvider>

    </BrowserRouter>
  </StrictMode>,
)
