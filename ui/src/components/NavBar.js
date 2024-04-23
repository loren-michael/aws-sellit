import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Logout from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
// import Headphones from '@mui/icons-material/Headphones';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleUser, faArrowRightFromBracket, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import logo from '../images/sellit-4.png'
import { useSelector, useDispatch } from 'react-redux';
import { deleteSession } from '../actions/sessions';
// import { Typography } from '@mui/material';



const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loggedIn, currentUser } = useSelector(store => store.sessions);

  function handleLogout() {
    fetch('/logout', {
      method: "DELETE"
    })
    .then(dispatch(deleteSession()))
    .then(navigate('/'))
  };

  function handleCart() {
    navigate("/cart")
  };

  return (
    <div class="h-40">

      <div class="w-full">
        <a href="/"><img href="/" class="h-36 float-left" src={logo} alt="Sell It! Home" /></a>

        {loggedIn ? 
          <span class="float-right" className="loginLinks">
            <span class="font-sans font-medium text-lg pr-5 ">Welcome, {currentUser.username}! </span>
            <NavLink to="/profile" href="/profile" class="font-sans text-lg text-black">
              <AccountCircle size="xl" style={{color: "#000000", padding: "10px"}} onClick={() => navigate("/profile")} />
              {/* <FontAwesomeIcon onClick={() => navigate("/profile")} icon={faCircleUser} size="xl" style={{color: "#000000", padding: "10px"}} /> */}
            </NavLink>
            <NavLink to="/cart" href="/cart" class="font-sans text-lg text-black">
              <ShoppingCart  onClick={() => handleCart()} size="xl" style={{color: "#000000", padding: "10px"}} />
              {/* <FontAwesomeIcon onClick={() => handleCart()} icon={faCartShopping} size="xl" style={{color: "#000000", padding: "10px"}} /> */}
            </NavLink>
            <NavLink to="/" href="/" class="font-sans text-lg text-black">
              <Logout onClick={() => handleLogout()} size="xl" style={{color: "#000000", padding: "10px"}} />
              {/* <FontAwesomeIcon onClick={() => handleLogout()} icon={faArrowRightFromBracket} size="xl" style={{color: "#000000", padding: "10px"}} /> */}
            </NavLink>
            {/* <FontAwesomeIcon icon={faBars} size="xl" style={{color: "#000000", padding: "10px"}} /> */}
          </span>
        :
        <span class="float-right" className="loginLinks text-black">
            <NavLink to="/login" className="text-black">Log In</NavLink>  or  <NavLink to="/signup" className="text-black"> Sign Up </NavLink>
            {/* <FontAwesomeIcon icon={faCircleUser} size="xl" style={{color: "#000000",}} /> */}
          </span>
      }

      </div>
    </div>
  )
};

export default NavBar;