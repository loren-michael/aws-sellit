import React, { useRef, useState, useEffect } from 'react'
import '../index.css'
import { useNavigate, NavLink } from 'react-router-dom';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch } from 'react-redux';
import { createSession } from '../actions/sessions';
import logo from '../images/sellit-4.png'


const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const EMAIL_REGEX = /^[A-Za-z0-9.-]+@[A-Za-z0-9.-]+$/;
;

const SignUp = () => {
  const errRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');


  // test username against username regex whenever username is changed
  useEffect(() => {
    setValidName(USER_REGEX.test(username))
  }, [username])

  // test password against password regex AND verify matching password
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(password));
    setValidMatch(password === matchPwd);
  }, [password, matchPwd]);

  // remove errors when user is making changes to reverify results
  useEffect(() => {
    setErrMsg('');
  }, [username, password, matchPwd])

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(emailAddress))
  }, [emailAddress])


  const handleSubmit = (e) => {
    e.preventDefault();
    const verifyUsername = USER_REGEX.test(username);
    const verifyPassword = PWD_REGEX.test(password);
    if (!verifyUsername || !verifyPassword) {
      setErrMsg("Invalid Entry");
      return;
    } else {
      fetch('/signup', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          user: {
            username: username,
            first_name: firstName,
            last_name: lastName,
            email: emailAddress,
            password: password
          }
        })
      })
      .then(r => {
        if (r.ok) {
          r.json().then(user => dispatch(createSession(user)))
          .then(navigate("/"))
        } else {
          r.json().then(data => setErrMsg(data.errors))
        }
      })
    }
  }

  return (
    <div>
      <span><a href="/"><img src={logo} alt="Sell It! Home" class="h-36"></img></a></span>
      <section>
      <h3>Sign Up</h3>
      {/* If errMsg exists, we will display it, otherwise it just displays offscreen but is still available to screen readers rather than display=none removing from the document */}
      {/* The aria-live assertive setting will tell the screen reader to announce the error message if a new one is set */}
      <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
      <form onSubmit={ handleSubmit } >
        <label htmlFor='username'>Username: 
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck}/>
          </span>
          <span className={validName || !username ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes}/>
          </span>
        </label>
        <input 
          required
          type="text"
          id="username"
          // ref={userRef}
          autoComplete="off"
          value={ username }
          onChange={ e => setUsername(e.target.value) }
          aria-invalid={validName ? "false" : "true"}
          aria-describedby='uidnote'
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p id="uidnote" className={userFocus && username && !validName ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.<br></br>
          Must begin with a letter.<br></br>
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <label htmlFor='emailaddress'>
          Email Address: 
          <span className={validEmail ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validEmail || !emailAddress ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="emailAddress"
          value={ emailAddress }
          onChange={e => setEmailAddress(e.target.value)}
        />


        <label htmlFor='first_name'>
          First name: 
        </label>
        <input
          type="text"
          id="firstName"
          value={ firstName }
          onChange={e => setFirstName(e.target.value)}
          aria-describedby="firstnamenote"
        />
        <p id="firstnamenote" className="offscreen">
          Please enter your first name.
        </p>

        <label htmlFor='last_name'>
          Last Name: 
        </label>
        <input
          type="text"
          id="lastName"
          value={ lastName }
          onChange={e => setLastName(e.target.value)}
          aria-describedby="nastnamenote"
        />
        <p id="lastnamenote" className="offscreen">
          Please enter your last name.
        </p>

        <label htmlFor='password'>
          Password: 
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !password ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes}/>
          </span>
        </label>
        <input
          required
          type="password"
          id="password"
          value={ password }
          // ref={userRef}
          onChange={e => setPassword(e.target.value)}
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby='pwdnote'
          onFocus={() => setPwdFocus(true)}
          onBlur={() => setPwdFocus(false)}
        />
        <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          Must include uppercase and lowercase letters, a number and a special character.<br></br>
          Allowed special characters: 
            <span aria-label='exclamation mark'>!</span>
            <span aria-label='at symbol'>@</span>
            <span aria-label='hashtag'>#</span>
            <span aria-label='dollar sign'>$</span>
            <span aria-label='percent'>%</span>
        </p>

        <label htmlFor='confirmPwd'>
          Confirm Password: 
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck}/>
          </span>
          <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes}/>
          </span>
        </label>
        <input
          required
          type="password"
          id="confirmPwd"
          value={ matchPwd }
          onChange={e => setMatchPwd(e.target.value)}
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby='confirmnote'
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
          />
          <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            Must match the password input field.
          </p>
          <br></br>
        <button class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow" disabled={!validName || !validPwd || !validMatch || !validEmail ? true : false}>Sign Up</button>
      </form>
      <span>
        <p>Already Registered?</p><NavLink to="/login">Log In Here!</NavLink>
      </span>
      </section>
    </div>
  )
}

export default SignUp