import React, { useState } from "react";
import { signup } from '../store/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('Las Vegas');
  const [state, setState] = useState('NV')
  const [submitted, setSubmitted] = useState(false);

  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.authentication.id);
  const error_msg = useSelector(state => state.authentication.error);


  function handleChange(e) {
    const { id, value } = e.target;
    switch (id) {
      case "name":
        setName(value);
        return;
      case "email":
        setEmail(value);
        return;
      case "password":
        setPassword(value);
        return;
      case "city":
        setCity(value);
        return;
      case "state":
        setState(value);
        return;
      default:
        return;
    }
  }

  const handleSubmit = async (e) => {
    let points = 200;
    e.preventDefault();
    setSubmitted(true);
    if (password && email && name) {
      dispatch(signup(name, email, password, city, state, points));
    }
  }

  if (currentUserId) {
    return <Redirect to="/" />;
  }

  const cityOptions = [
    "Las Vegas", "Birmingham", "Huntsville", "Montgomery", "Los Angeles", "San Diego", "San Jose", "San Francisco", "Boise", "Meridian", "Nampa", "Idaho Falls", "New York City", "Baltimore",
    "Wilmington", "Philadelphia", "Houston", "Trenton",
  ]

  const stateOptions = [
    "NV", "AL", "CA", "ID", "NY", "TX", "DE", "PA", "NJ", "MD",
  ]

  return (
    <div className="loginandsignup">
      <img className='login__image' alt="" />
      <h2>Welcome To Foodie!</h2>
      <form name='form' onSubmit={handleSubmit}>
        <fieldset>
          <div className="input-fields">
            <label htmlFor="name">Name</label>
            <input type="txt"
              id="name"
              value={name}
              placeholder="Please enter your name"
              onChange={handleChange} />
            {submitted && !name &&
              <div className="invalid-feedback">Name is required</div>}
          </div>
          <div className="input-fields">
            <label htmlFor="email">Email</label>
            <input type="email"
              id="email"
              value={email}
              placeholder="Please enter Email"
              onChange={handleChange} />
            {submitted && !email &&
              <div className="invalid-feedback">Email is required</div>}
          </div>
          <div className="input-fields">
            <label htmlFor="password">Password</label>
            <input type="password"
              id="password"
              placeholder="Please enter password"
              value={password}
              onChange={handleChange} />
            {submitted && !password &&
              <div className="invalid-feedback">Password is required</div>}
          </div>
          <div className="input-fields">
            <label htmlFor="city">Primary Dining City</label>
            <select value={city} id="city" placeholder="Select City" onChange={handleChange}>
              {cityOptions.map((value, i) => <option key={`${value}-${i}`} city={value}>{value}</option>)}
            </select>
          </div>
          <div className="input-fields">
            <label htmlFor="state">Primary Dining State</label>
            <select value={state} id="state" placeholder="Select State" onChange={handleChange}>
              {stateOptions.map((value, i) => <option key={`${value}-${i}`} state={value}>{value}</option>)}
            </select>
          </div>
          <br />
          <div className="login-buttons">
            <button type="submit">Register</button>
            <div>
              <div>Already a member?</div>
              <a href="/login">Log In</a>
            </div>

          </div>
          <div id="error">{error_msg}</div>
        </fieldset>
      </form>
    </div>
  )
}
export default SignUp;
