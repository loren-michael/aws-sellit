const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
};

export const addItem = item => {
  return (dispatch)  => {
    dispatch({ type: "CREATE_ITEM", payload: item })
    dispatch({ type: "ADD_ITEM_TO_USER", payload: item })
  }
}

export const deleteItem = id => {
  return (dispatch) => {
    fetch("/items/" + id, {
      method: "DELETE",
      headers: headers,
      body: JSON.stringify(id)
    })
    .then(r => r.json())
    .then(item => dispatch({type: "DELETE_ITEM", payload: item}))
  }
}

export const loadItem = id => {
  return (dispatch) => {
    fetch('/items/' + id)
    .then(r => r.json())
    .then(item => dispatch({type: "LOAD_ITEM", payload: item}))
  }
}

export const loadItems = () => {
  return (dispatch) => {
    fetch("/items")
    .then(r => r.json())
    .then(data => dispatch({type: "LOAD_ITEMS", payload: data}))
  }
}

export const updateItem = (item) => {
  return (dispatch) => {
    dispatch({type: "UPDATE_ITEM", payload: item})
  }
}