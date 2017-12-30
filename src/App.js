import React, { Component } from 'react';
import Header from './presentational/Header';
import Monitoring from './container/Monitoring';

class App extends Component {
  render() {
    return (
      <div>
        <Header>Monitoring chart</Header>
        <Monitoring />
      </div>
    );
  }
}

export default App;
