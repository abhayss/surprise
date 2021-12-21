import React, {Component} from 'react';
import './App.css';
import SurpriseBox from './container/surprise';

class App extends Component {
  
  render() { 
   return(
    <div className='App'>
        <SurpriseBox />
    </div>
   );
 }
}

export default App;
