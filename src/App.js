import React from 'react';
import LoginRegisterForm from './LoginRegisterForm'
import ArtworkContainer from './ArtworkContainer'
import 'semantic-ui-css/semantic.min.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <LoginRegisterForm />
      <ArtworkContainer />
    </div>
  );
}

export default App;
