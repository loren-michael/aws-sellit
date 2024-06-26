import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import NavBar from './components/NavBar';
import Home from './components/Home';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Cart from './components/Cart';
import ItemsContainer from './components/ItemsContainer';
import ItemDetails from './components/ItemDetails';
import Profile from './components/Profile';
import ItemForm from './components/ItemForm';
import CheckOut from './components/CheckOut';
import ItemEdit from './components/ItemEdit';
import { loadItems } from './actions/items';
import { loadSession } from './actions/sessions';
// import axios from 'axios';


function App() {
  const dispatch = useDispatch();
  // const [items, setItems] = useState();

  useEffect(() => {
    dispatch(loadItems())
    dispatch(loadSession())
  }, [])

  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route exact path="/" element={ <Home /> } />
          <Route path="/signup" element ={ <SignUp /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/cart" element={ <Cart /> } />
          <Route path="/items" element={ <ItemsContainer /> } />
          <Route path="/items/:id" element={ <ItemDetails /> } />
          <Route path="/profile" element={ <Profile /> } />
          <Route path="/new_item" element={ <ItemForm /> } />
          <Route path="/checkout/:id" element={ <CheckOut /> } />
          <Route path="/edit" element={ <ItemEdit /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
