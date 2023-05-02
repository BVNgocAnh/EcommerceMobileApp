import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import wishlistReducer from "./wishlistReducer";
import addressReducer from "./profileReducer";
import orderReducer from "./orderReducer";

const routeReducer = combineReducers({
  cartReducer,
  wishlistReducer,
  addressReducer,
  orderReducer,
});

export default routeReducer;
