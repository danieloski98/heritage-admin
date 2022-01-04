import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import AuthenticationRoute from './navigation/Authentication'

function App() {

  const checker = () => {
    return <AuthenticationRoute />
  }

  return (
    <BrowserRouter>
      {checker()}
    </BrowserRouter>
  );
}

export default App;
