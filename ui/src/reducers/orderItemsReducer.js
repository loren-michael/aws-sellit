const initialState = {
  orderItems: []
}

const orderItemsReducer = (state=initialState, action) => {
  switch(action.type) {
    case "LOAD_ORDER_ITEMS":
      return {
        ...state,
        orderItems: action.payload
      };
    case "CREATE_ORDER_ITEM":
      return {
        ...state,
        orderItems: [...state.orderItems, action.payload]
      };
    case "DELETE_ORDER_ITEM":
      return {
        ...state,
        orderItems: state.orderItems.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
}

export default orderItemsReducer;