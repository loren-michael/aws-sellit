const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
};


export const loadCarts = () => {
  return (dispatch) => {
    fetch('/carts')
    .then(r => r.json())
    .then(carts => dispatch({type: "LOAD_CARTS", payload: carts}))
  }
}

export const createCart = () => {
  return (dispatch) => {
    fetch('/carts', {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        active: true
      })
    })
    .then(r => r.json())
    .then(cart => dispatch({type: "CREATE_CART", payload: cart}))
  }
}

export const addItemToCart = id => {
  return (dispatch)  => {
    fetch("/cart_items", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({id: id})
    })
    .then(r => r.json())
    .then(item => dispatch({ type: "ADD_ITEM", payload: item }))
  }
}

export const deactivateCart = (id) => {
  return (dispatch) => {
    fetch('/carts/' + id, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({ active: false })
    })
    .then(r => r.json())
    .then(cart => dispatch({type: "DEACTIVATE_CART", payload: cart}))
  }
}

export const activateCart = (id) => {
  return (dispatch) => {
    fetch('/carts/' + id, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({ active: true })
    })
    .then(r => r.json())
    .then(cart => dispatch({type: "ACTIVATE_CART", payload: cart}))
  }
}

export const emptyCart = (id) => {
  return (dispatch) => {
    fetch('/empty_cart/' + id, {
      method: "PATCH",
      headers: headers
    })
    .then(r => r.json())
    .then(cart => dispatch({type: "EMPTY_CART", payload: cart}))
  }
}

export const deleteCart = (id) => {
  return (dispatch) => {
    fetch('/carts/'+ id, {
      method: "DELETE"
      })
    .then(r => r.json())
    .then(cart => dispatch({type: "DELETE_CART", payload: cart}))
  }
}

export const updateCart = (cart) => {
  return (dispatch) => {
    dispatch({type: "UPDATE_CART", payload: cart})
  }
}