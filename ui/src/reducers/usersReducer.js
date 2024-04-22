const initialState = {
  loggedIn: false,
  user: {}
}

const usersReducer = (state=initialState, action) => {
  switch(action.type) {
    default:
      return state;
  }
}

export default usersReducer;