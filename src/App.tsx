import React from 'react';
import './App.css';

import Visual from './components/Visual'

function App() {
  return (
    <div className="App">
      <Visual type='day'/>
      <Visual type='hour'/>
      <Visual type='minute'/>
    </div>
  );
}

export default App;
