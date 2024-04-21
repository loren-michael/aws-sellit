export const loadSession = user => {
  return (dispatch) => {
    fetch("/me")
    .then(r => {
      if (r.ok) {
        r.json().then(user => dispatch({type: "LOAD_SESSION", payload: user}))
      } else {
        r.json().then(data => console.log(data.errors))
      }
    })
  }
}

export const createSession = user => {
  return {
    type: "CREATE_SESSION",
    payload: user
  }
}

export const deleteSession = () => {
  return {
    type: "DELETE_SESSION",
    payload: null
  }
}