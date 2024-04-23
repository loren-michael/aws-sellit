import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createSession } from '../actions/sessions';
import logo from '../images/sellit-4.png'


const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([])

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('./login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then(r => {
      if (r.ok) {
        r.json().then(user => dispatch(createSession(user)))
        .then(navigate("/"))
      } else {
        r.json().then(data => setErrors(data.errors))
      }
    })
  }

  return (
    <div>
      <span><a href="/"><img src={logo} alt="Sell It! Home" class="h-36"></img></a></span>
      <section>
        <h3>Log In</h3>
        {errors ? <p>{errors.map(err => <p key={err} className="errMsg" aria-live="assertive">{err}</p>)}</p> : null}
        {/* <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p> */}
        <form onSubmit={ handleLogin }>
          <label htmlFor='username'>Username: </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            aria-describedby='uidnote'
          />
          <p id="uidnote" className="offscreen">Please enter your username</p>
          <label htmlFor='password'>Password: </label>
          <input 
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            aria-describedby='pwdnote'
          />
          <p id="pwdnote" className="offscreen">Please enter your password</p>
          <br></br>
          <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" type="submit" value="Log In">Log In</button>
        </form>
        <br></br>
        <br></br>
        <span>
          <p>Need to register?</p>
          <NavLink to="/signup">Sign Up Here!</NavLink>
        </span>
      </section>
    </div>
  )
}

export default Login