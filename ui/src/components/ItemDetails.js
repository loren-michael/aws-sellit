import React, { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { deleteItem, loadItem } from '../actions/items';
import { addItemToCart } from '../actions/carts';


const ItemDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const itemId = params.id;
  const displayItem = useSelector(store => store.items.displayItem);
  const currentUser = useSelector(store => store.sessions.currentUser);
  const [loading, setLoading] = useState(true);
  const loggedIn = useSelector(store => store.sessions.loggedIn);

  useEffect(() => {
    dispatch(loadItem(itemId))
    if (displayItem) {
      setLoading(false)
    }
  }, []);

  function handleAddCart() {
    dispatch(addItemToCart(displayItem.id))
    navigate("/cart")
  };

  function handleDeleteListing (e) {
    dispatch(deleteItem(e.target.id))
    navigate("/profile")
  };

  function handleEditListing() {
    navigate("/edit")
  };


  return (
    <div>
      <NavBar />
      {loading ? 
        <div class="p-9">Item details loading...</div>
      :
        <div class="columns-2">
          <div>
            <div class="max-w-2/4 p-2 font-sans text-2xl font-semibold text-center">
              {displayItem.title}
            </div>
            <div class="max-w-2/4 h-96">
              <img class="m-auto max-h-96 object-scale-down" src={displayItem.image} alt={displayItem.title}></img>
            </div>
          </div>
          <div class="max-w-2/4 p-2 font-sans text-lg">
            <div class="font-semibold p-5">
              More Details:
            </div>
            <div class="font-sans h-48 text-lg">
              {displayItem.description}
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              ${displayItem.price}
            </div>
            <div>
              { loggedIn ?
                <div>
                  {
                    displayItem.user_id === currentUser.id ?
                    <div>
                      <button id={displayItem.id} onClick={() => handleEditListing()} class="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">Edit Listing</button>
                      <button id={displayItem.id} onClick={(e) => handleDeleteListing(e)} class="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">Delete Listing</button>
                    </div>
                    :
                    <button onClick={() => handleAddCart()} class="bg-transparent hover:bg-black text-black font-semibold hover:text-white py-2 px-4 border border-black hover:border-transparent rounded">Add To Cart</button>
                  }
                </div>
                
                :
                <Link href="/login" to="/login" class="font-sans bg-black font-semibold hover:text-white py-2 px-4 border border-black rounded">Log in to purchase</Link>
              }
            </div>
          </div>
        </div>
      }
    </div>
  )
};

export default ItemDetails;