const initialState = {
  cartItems: []
}

const cartItemsReducer = (state=initialState, action) => {
  switch(action.type) {
    case "LOAD_CART_ITEMS":
      return {
        ...state,
        cartItems: action.payload
      };
    case "CREATE_CART_ITEM":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      };
    default:
      return state;
  }
}

export default cartItemsReducer;