const initialState = {
  carts: [],
};

const cartsReducer = (state=initialState, action) => {
  switch(action.type) {
    case "LOAD_CARTS":
      return {
        ...state,
        carts: action.payload
      };
    case "CREATE_CART":
      return {
        ...state,
        carts: [...state, action.payload]
      };
    case "ADD_CART_ITEM":
      return {
        ...state,
        carts: [...state.items, action.payload]
      };
    case "EMPTY_CART":
      return {
        ...state,
        carts: state.carts.map(cart => {
          if (cart.id === action.payload.id) {
            return action.payload
          } else {
            return cart
          }
        })
      };
    case "ACTIVATE_CART":
      return {
        ...state,
        carts: state.carts.map(cart => {
          if (cart.id !== action.payload.id) {
            cart.active = false
            return cart
          } else {
            return action.payload
          }
        })
      };
    case "DEACTIVATE_CART":
      return {
        ...state,
        carts: state.carts.map(cart => {
          if (cart.id !== action.payload.id) {
            return cart
          } else {
            return action.payload
          }
        })
      };
    case "DELETE_CART":
      return {
        ...state,
        carts: state.carts.filter(cart => cart.id !== action.payload.id)
      };
    case "UPDATE_CART":
      return {
        ...state,
        carts: state.carts.map(cart => {
          if (cart.id !== action.payload.id) {
            return cart
          } else {
            return action.payload
          }
        })
      };
    case "DELETE_CART_ITEM":
      return {
        ...state,
        carts: state.carts.map(cart => {
          if (cart.id == action.payload.cart.id) {
            return {
              ...cart,
              items: cart.items.filter(item => item.id !== action.payload.item.id),
              cart_price: action.payload.cart.cart_price
            }
          } else {
            return cart
          }
        })
      };
    default:
      return state;
  }
}

export default cartsReducer;