import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/authentication';
import { Container } from '../components/ui';
import { Grid } from './ui/Grid';
// import { Container } from 'semantic-ui-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.authentication.id);

  const handleLogIn = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  }

  const handleDemoLogIn = (e) => {
    e.preventDefault();
    const demoEmail = 'demo@example.com';
    const demoPassword = 'password';
    dispatch(login(demoEmail, demoPassword));
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "email":
        setEmail(value);
        return;
      case "password":
        setPassword(value);
        return;
      default:
        return;
    }
  }

  if (currentUserId) {
    return <Redirect to="/" />;
  }


  return (

    <Grid>
      <Container flex flexJustify='center' mt={5} width={100}>
        <h1>Sign in</h1>
        <form onSubmit={handleLogIn}>
          <div className="input-fields">
            <label htmlFor="email">Email address</label>
            <input type="email"
              id="email"
              placeholder="you@yours.com"
              onChange={handleChange} />
          </div>
          <div className="input-fields">
            <label htmlFor="password">Password</label>
            <input type="password"
              id="password"
              onChange={handleChange} />
          </div>
          <div className="login-spacer"></div>
          <div className="login-submit">
            <div className="login-buttons">
              <button type="submit">Sign in</button>
              <button className="demouser" onClick={handleDemoLogIn}>Demo User</button>
            </div>
            <div className="login-signup">
              <span>
                <span>Not a member?</span>
                <a href="/signup">Sign up</a>
              </span>
            </div>
          </div>
        </form>
        <h1>SKJSLKDfj</h1>
      </Container>
    </Grid>
  );
}

export default Login;
