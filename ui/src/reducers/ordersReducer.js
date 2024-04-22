const initialState = {
  orders: [],
};

const ordersReducer = (state=initialState, action) => {
  switch(action.type) {
    case "LOAD_ORDERS":
      return {
        ...state,
        orders: action.payload
      };
    case "CREATE_ORDER":
      return {
        ...state,
        orders: [...state, action.payload]
      };
    default:
      return state;
  }
}

export default ordersReducer;