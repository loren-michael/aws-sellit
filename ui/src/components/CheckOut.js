import React, { useState } from 'react';
import NavBar from './NavBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deactivateCart } from '../actions/carts';

const CheckOut = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const carts = useSelector(store => store.carts);
  const checkOutCart = carts.carts.find(cart => cart.id == params.id);


  function processCheckOut (e) {
    setLoading(true)
    const id = e.target.id
    dispatch(deactivateCart(id))
    navigate('/cart')
  }


  return (
    <div>
      <NavBar />
      <div>
        <h3 class="pl-20">Complete your order</h3>
        {errors ? <p>{errors.map(err => <p key={err} className="errMsg" aria-live="assertive">{err}</p>)}</p> : null}
          <div key={checkOutCart.id} class="p-3 mb-3  w-9/12 m-auto bg-slate-200 rounded border-2 border-black columns-auto">
            <div class="w-15">
              <div class="m-8"><FontAwesomeIcon icon={faCartShopping} size="xl" style={{color: "#00ff00",}} /></div> 
              </div>
              <div class="w-fit font-sans">
                {checkOutCart.items.map(item => {
                  return (
                    <div class="flex flex-wrap" key={item.id}>
                      <p class="pl-5 align-middle">{item.title.substring(0,25)}</p>
                      <div class="pl-12"> ${item.price}</div>
                    </div>
                  )
                })}
                <br></br>
                <p class="font-sans font-semibold text-xl">TOTAL:  ${checkOutCart.cart_price}</p>
                <br></br>
              </div>
              <div>
              </div>
              <div class="relative h-32 w-32">
                <div class="">
                  <br></br>
                  {
                    loading ? 
                    <button class="opacity-50 cursor-not-allowed inset-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-4 border border-gray-400 rounded shadow">Please wait</button>
                    :
                    <button id={checkOutCart.id} onClick={(e) => processCheckOut(e)} class="inset-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-4 border border-gray-400 rounded shadow">Check Out</button>
                  }
                </div>
              </div>
            </div>
      </div>
    </div>
  )
}

export default CheckOut