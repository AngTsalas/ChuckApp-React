import store from './store'

//Dispatches an action that adds a query and its results to memory
export function addQuery(query, data){
	store.dispatch({
	  type: 'ADD_QUERY',
	  result: {query: query, data: data}
	});
}

//Dispatches an action that removes a query and its results from memory
export function removeQuery(query){
	store.dispatch({
	  type: 'REMOVE_QUERY',
	  result: {query: query}
	});
}

