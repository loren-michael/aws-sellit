const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
};


export const loadCartItems = () => {
  return (dispatch) => {
    fetch('/cart_items')
    .then(r => r.json())
    .then(cartItems => dispatch({type: "LOAD_CART_ITEMS", payload: cartItems}))
  }
}

export const createCartItem = (cartItem) => {
  return (dispatch) => {
    fetch('/cart_items', {
      method: "POST",
      headers: headers,
      body: JSON.stringify({cartItem})
    })
    .then(r => r.json())
    .then(cartItem => dispatch({type: "CREATE_CART_ITEM", payload: cartItem}))
  }
}

export const editCartItem = (id) => {
  return (dispatch) => {
    fetch('/cart_items/' + id, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({})
    })
    .then(r => r.json())
    .then(cartItem => dispatch({type: "EDIT_CART_ITEM", payload: cartItem}))
  }
}

export const deleteCartItem = (id) => {
  return (dispatch) => {
    fetch('/cart_items/' + id, {
      method: "DELETE",
      headers: headers
    })
    .then(r => r.json())
    .then(cartItem => dispatch({type: "DELETE_CART_ITEM", payload: cartItem}))
  }
}