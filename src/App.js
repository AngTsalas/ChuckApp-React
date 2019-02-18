import React, { Component } from 'react';
import {createStore} from 'redux';
import $ from 'jquery';
import './App.css';


//Saves the state to local storage when app closes or reloads
window.onbeforeunload = function(){
	localStorage.clear();
    saveToLocal(store.getState());
}

//Reducer that loads the initial state from local storage, as well as handles actions
const userReducer = function(state, action) {
	let newState = []
	switch (action.type){
		case 'ADD_QUERY': 
			newState = [...state, action.result];
			return newState;
			
		case 'REMOVE_QUERY':
			newState = state.filter(function( obj ) {
			return obj.query !== action.result.query
			});
			return newState;
  
		default: 
			state=loadFromLocal();
			return state;
	}
}

//Creates the store that will serve as memory
const store = createStore(userReducer);

//Dispatches an action that adds a query and its results to memory
function addQuery(query, data){
	store.dispatch({
	  type: 'ADD_QUERY',
	  result: {query: query, data: data}
	});
}

//Dispatches an action that removes a query and its results from memory
function removeQuery(query){
	store.dispatch({
	  type: 'REMOVE_QUERY',
	  result: {query: query}
	});
}

//Checks if a query is in memory
function isInMemory(state, query) {
    for (let i = 0; i < state.length; i++) {
        if (state[i].query === query) {
            return true;
        }
    }
    return false;
}

//Returns the stored results for a given query
function getFromMemory(state, query) {
    for (let i = 0; i < state.length; i++) {
        if (state[i].query === query) {
            return state[i].data;
        }
    }
}

//Saves memory to local storage
function saveToLocal(state){
	
	for (let i = 0; i < state.length; i++) {
		localStorage.setItem(state[i].query, JSON.stringify(state[i].data));
	}	
}

//Loads all queries and their results from local storage
function loadFromLocal(){
	const state = [],
    keys = Object.keys(localStorage);
	for (let i = 0; i < keys.length; i++) {
		state[i] = {query: keys[i], data: JSON.parse(localStorage.getItem(keys[i]))}
	}		
    return state;	
}

//Component for a single row of results
function ResultRow(props){
	return(
		<div className="joke">
			<img src={props.img} alt="Chuck"/> <p>{props.value}</p>
		</div>
	);
}

//Component for results
function Result(props){
	const rows = [];
	for (let i = 0; i < props.results.total; i++) {
		rows.push(<ResultRow key={i} img={props.results.result[i].icon_url}
						value={props.results.result[i].value} /> );
	}
	
	return(
		<div id="result">
			{rows}	
		</div>
	);
}

//The root component that contains the searchbar and the results
class Container extends React.Component {
    constructor(props) {
		super(props);
		this.state = {data: "", noResults: false};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getResults = this.getResults.bind(this);
		
  }
  
  //Handles user input
   handleChange(event) {
		this.setState({value: event.target.value});
  }
  
  //Handles the form submit
   handleSubmit(event) {
		this.getResults();
		event.preventDefault();
  }
  
  //Gets results from memory or from the API if the query is not in memory, in which case the query and its results are added to memory
	getResults() {
		const query=this.state.value;
		if (query !== null && query.trim() !== ""){
			if (!isInMemory(store.getState(), query)) {
				   $.getJSON("https://api.chucknorris.io/jokes/search?query=" + query, function(data){
						addQuery(query, data);
						this.setState({data: data, value: query, noResults: false});
						if(data.total === 0){
							this.setState({noResults: true});
						}
					}.bind(this));
			}else{
				const data = getFromMemory(store.getState(),query);
				this.setState({data: data, value: query, noResults: false});
				if(data.total === 0){
					this.setState({noResults: true});
				}			
			}
		}
	}
  
  //Handles clicking the Remove query button
	handleRemove() {
		const query=this.state.value;
		if (query !== null && query.trim() !== ""){
			if (isInMemory(store.getState(), query)) {
				removeQuery(query);
				alert("Query '" + query + "' was removed from memory.")
			}else{
				alert("Query '" + query + "' is not in memory.")
			}	
		}	
		
	}	

  render() {
	const result = this.state.noResults ? <h4>No results found.</h4> : <Result results={this.state.data} />;
	return (
		<div>
			<form className="Searchbar" onSubmit={this.handleSubmit}>
			<label>
			  Query:
			</label>
			<input type="text" value={this.state.value} onChange={this.handleChange} />
			<input type="submit" id="search" value="Search" />
			<button type="button" id="remove" onClick={() => this.handleRemove()}>Remove query</button>
			</form>
			{result}
	    </div>
    );
  }
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

