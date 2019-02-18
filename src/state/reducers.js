//Reducer that loads the initial state from local storage, as well as handles actions

import {loadFromLocal} from "../utils/utils";

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

export default userReducer