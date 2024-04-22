import { combineReducers } from "redux";
import itemsReducer from "./itemsReducer";
import usersReducer from "./usersReducer";
import sessionsReducer from './sessionsReducer';
import cartsReducer from './cartsReducer';
import cartItemsReducer from './cartItemsReducer';
import orderItemsReducer from "./orderItemsReducer";

export default combineReducers({
  items: itemsReducer,
  usersReducer: usersReducer,
  sessions: sessionsReducer,
  carts: cartsReducer,
  cartItems: cartItemsReducer,
  orderItems: orderItemsReducer
})