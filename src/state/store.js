//Creates the store that will serve as memory

import {createStore} from "redux";
import userReducer from "./reducers";

const store = createStore(userReducer);

export default store