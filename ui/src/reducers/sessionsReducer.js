const initialState = {
  currentUser: {},
  loggedIn: false
}

const sessionsReducer = (state=initialState, action) => {
  switch(action.type) {
    case "LOAD_SESSION":
      return {
        ...state,
        loggedIn: true,
        currentUser: action.payload
      }
    case "CREATE_SESSION":
      return {
        ...state,
        loggedIn: true,
        currentUser: action.payload
      };
    case "DELETE_SESSION":
      return initialState
    default:
      return state;
  }
}

export default sessionsReducer;