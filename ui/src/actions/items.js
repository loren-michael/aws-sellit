import { API_URL } from "../utils";
// import axios from "axios";

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
    fetch(API_URL + "/items/" + id, {
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
    fetch(API_URL + '/items/' + id)
    .then(r => r.json())
    .then(item => dispatch({type: "LOAD_ITEM", payload: item}))
  }
}

export const loadItems = () => {
  return (dispatch) => {
    fetch(API_URL + `/items`)
    .then(r => r.json())
    .then(data => dispatch({type: "LOAD_ITEMS", payload: data}))
  }
}

export const updateItem = (item) => {
  return (dispatch) => {
    dispatch({type: "UPDATE_ITEM", payload: item})
  }
}