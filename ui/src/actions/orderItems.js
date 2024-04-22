const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
};


export const loadOrderItems = () => {
  return (dispatch) => {
    fetch('/order_items')
    .then(r => r.json())
    .then(orderItems => dispatch({type: "LOAD_ORDER_ITEMS", payload: orderItems}))
  }
}

export const createOrderItem = (orderItem) => {
  return (dispatch) => {
    fetch('/order_items', {
      method: "POST",
      headers: headers,
      body: JSON.stringify({orderItem})
    })
    .then(r => r.json())
    .then(orderItem => dispatch({type: "CREATE_ORDER_ITEM", payload: orderItem}))
  }
}