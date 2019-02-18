import React, { Component } from 'react';
import store from './state/store'
import './App.css';
import Container from "./components/Container";
import {saveToLocal} from "./utils/utils";


//Saves the state to local storage when app closes or reloads
window.onbeforeunload = function(){
	localStorage.clear();
    saveToLocal(store.getState());
}

class App extends Component {
  render() {
   return (
      <div className="App">
		<Container />
	  </div>
    );
  }
}

export default App;

