//Checks if a query is in memory
export function isInMemory(state, query) {
    for (let i = 0; i < state.length; i++) {
        if (state[i].query === query) {
            return true;
        }
    }
    return false;
}

//Returns the stored results for a given query
export function getFromMemory(state, query) {
    for (let i = 0; i < state.length; i++) {
        if (state[i].query === query) {
            return state[i].data;
        }
    }
}

//Saves memory to local storage
export function saveToLocal(state){

	for (let i = 0; i < state.length; i++) {
		localStorage.setItem(state[i].query, JSON.stringify(state[i].data));
	}
}

//Loads all queries and their results from local storage
export function loadFromLocal(){
	const state = [],
    keys = Object.keys(localStorage);
	for (let i = 0; i < keys.length; i++) {
		state[i] = {query: keys[i], data: JSON.parse(localStorage.getItem(keys[i]))}
	}
    return state;
}
