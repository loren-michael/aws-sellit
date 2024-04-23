import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import { loadSession } from '../actions/sessions'
import { deleteItem } from '../actions/items'


const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loggedIn, currentUser } = useSelector(store => store.sessions);
  const items = useSelector(store => store.items.items)

  useEffect(() => {
    loadSession()
  },[])

  function handleFormNav () {
    navigate('/new_item')
  }

  function handleDeleteListing (e) {
    dispatch(deleteItem(e.target.id))
  }

  return (
    <div>
      <NavBar />
      { !loggedIn ? 
        <div class="max-w-2/4 p-2 font-sans text-2xl font-semibold text-center">Please log in to see your profile.</div>
        
        : 
        
        <div>
          <div class="max-w-2/4 p-2 font-sans text-2xl font-semibold text-center">
            {currentUser.username}'s Profile
          <div></div>
          </div>
            <div class="max-w-2/4 pt-6 p-2 font-sans text-xl font-semibold text-center">
              Listed Items
                  <div>
                    {items.map(item => {
                      if (item.user_id === currentUser.id) {
                        return (
                          <div class="p-3 mb-3 w-9/12 m-auto bg-slate-200 rounded border-2 border-black">
                            <div class="text-lg text-left">
                              {item.title}
                            </div>
                            <div class="text-lg text-right">
                            <button id={item.id} onClick={(e) => handleDeleteListing(e)} class="inset-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Delete Listing</button>
                            <NavLink to={`/items/${item.id}`} href={`/items/${item.id}`} class="font-sans text-lg text-black">
                              <button onClick={() => handleFormNav()} class="inset-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Go To Listing</button>
                            </NavLink>
                            </div>
                          </div>
                        )
                      }
                    })}
                  </div>
                <button onClick={() => handleFormNav()} class="inset-0 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Create Listing</button>
              </div>
        </div>
      }
    </div>
  )
}

export default Profile