const initialState = {
  items: [],
  displayItem: {}
}

const itemsReducer = (state=initialState, action) => {
  switch(action.type) {
    case "LOAD_ITEMS":
      return {
        ...state,
        items: action.payload
      };
    case "LOAD_ITEM":
      return {
        ...state,
        displayItem: action.payload
      };
    case "CREATE_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload]
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.payload.id) {
            return action.payload
          } else {
            return item
          }
        })
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };
    default:
      return state;
  }
}

export default itemsReducer;