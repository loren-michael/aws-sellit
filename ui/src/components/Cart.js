import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCart, emptyCart, loadCarts } from '../actions/carts';
import { deleteCartItem } from '../actions/cartItems';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector(store => store.carts);
  const activeFirst = carts.carts.sort((a, b) => b.active - a.active)

  useEffect(() => {
    dispatch(loadCarts())
  }, [])

  function handleRemoveItem (e) {
    dispatch(deleteCartItem(e.target.id))
  }

  function handleEmptyCart (e) {
    dispatch(emptyCart(e.target.id))
  }

  function handleCheckOut (e) {
    navigate(`/checkout/${e.target.id}`)
  }

  function handleDeleteCart(e) {
    dispatch(deleteCart(e.target.id))
  }


  return (
    <div>
      <NavBar />
      <div>
        <h3 class="pl-20">Your Carts:</h3>
        {activeFirst.map(cart => {
          return (
            <div key={cart.id} class="p-3 mb-3  w-9/12 m-auto bg-slate-200 rounded border-2 border-black columns-auto">
              <div class="w-15">
                  {cart.active ? 
                    <div class="m-8"><FontAwesomeIcon icon={faCartShopping} size="xl" style={{color: "#00ff00",}} /></div> 
                  : 
                    <div class="m-8"><FontAwesomeIcon icon={faCircleCheck} size="xl" style={{color: "#000000",}} /></div>
                  }
              </div>
              <div class="w-fit font-sans">
                {cart.items.map(item => {
                  const cartItemId = cart.cart_items.filter(ci => ci.item_id === item.id)
                  return (
                    <div class="flex flex-wrap" key={item.id}>
                      {
                        cart.active ? 
                        <button id={cartItemId[0].id} onClick={(e) => handleRemoveItem(e)} class="inset-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-2 border border-gray-400 rounded shadow">Remove</button>
                        :
                        null
                      }
                      <p class="pl-5 align-middle">{item.title.substring(0,25)}</p>
                      <div class="pl-12"> ${item.price}</div>
                    </div>
                  )
                })}
                <br></br>
                <p class="font-sans font-semibold text-xl">TOTAL:  ${cart.cart_price}</p>
                <br></br>
              </div>
              <div>
                {cart.cart_total}
              </div>
              <div class="relative h-32 w-32">
                <div class="">
                  <br></br>
                  {
                    cart.active ?
                    <div>
                      <button id={cart.id} onClick={(e) => handleEmptyCart(e)} class="inset-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Empty Cart</button>
                      <button id={cart.id} onClick={(e) => handleDeleteCart(e)} class="inset-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Delete Cart</button>
                      {
                        cart.cart_items.length > 0 ? 
                        <button id={cart.id} onClick={(e) => handleCheckOut(e)} class="inset-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Check Out</button>
                        :
                        <div></div>
                      }
                      
                    </div>
                    :
                    <div></div>
                  }
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Cart