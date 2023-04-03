import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import cartReducer2 from "./cartReducer2";
import wishlistReducer from "./wishlistReducer";
import addressReducer from "./profileReducer";
const routeReducer = combineReducers({
  cartReducer,
  wishlistReducer,
  addressReducer,
  cartReducer2,
});

export default routeReducer;
