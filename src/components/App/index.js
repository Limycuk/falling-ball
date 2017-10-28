import React from 'react';

import './styles.css';

import logo from '../../static/images/logo.svg';
import GameContainer from '../../containers/GameContainer'

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to React</h1>
      </header>
      <p className="App-intro">
        <GameContainer />
      </p>
    </div>
  );
}

export default App;
