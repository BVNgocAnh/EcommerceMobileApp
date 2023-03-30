import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import addressReducer from "./profileReducer";
const routeReducer = combineReducers({
  cartReducer,
  wishlistReducer,
  addressReducer,
});

export default routeReducer;
