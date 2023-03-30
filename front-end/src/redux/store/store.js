// import { createStore } from "redux";
import { legacy_createStore as createStore } from "redux";
import routeReducer from "../reducers/rootReducer";
const store = createStore(routeReducer);
export default store;
