import React, { useState } from "react";
import "./App.css";
import { useSpring, animated } from "react-spring";

const App = () => {
  const [registrationFormStatus, setRegistartionFormStatus] = useState(false);
  const loginProps = useSpring({ 
    left: registrationFormStatus ? -500 : 0, 
  });
  const registerProps = useSpring({
    left: registrationFormStatus ? 0 : 500, 
  });

  const loginBtnProps = useSpring({
    borderBottom: registrationFormStatus 
      ? "solid 0px transparent"
      : "solid 4px #40e0d0",  
  });
  const registerBtnProps = useSpring({
    borderBottom: registrationFormStatus
      ? "solid 4px #40e0d0"
      : "solid 0px transparent", 
  });

  function registerClicked() {
    setRegistartionFormStatus(true);
  }
  function loginClicked() {
    setRegistartionFormStatus(false);
  }

  return (
    <div className="login-register-wrapper ui form">
      <div className="nav-buttons">
        <animated.button
          onClick={loginClicked}
          id="loginBtn"
          style={loginBtnProps}
        >
          Login
        </animated.button>;
        <animated.button
          onClick={registerClicked}
          id="registerBtn"
          style={registerBtnProps}
        >
          Register
        </animated.button>
      </div>
      <div className="form-group ui form">
        <animated.form action="" id="loginform" style={loginProps}>
          <LoginForm />
        </animated.form>
        <animated.form action="" id="registerform" style={registerProps}>
          <RegisterForm />
        </animated.form>
      </div>
      <animated.div className="forgot-panel" style={loginProps}>
        <a herf="#">Forgot your password</a>
      </animated.div>
    </div>
  );
}

const LoginForm = () => {
  return (
    <React.Fragment>
      <label for="username">username</label>
      <input type="text" id="username" placeholder="username" />
      <label for="password">password</label>
      <input type="text" id="password" placeholder="password" />
      <input type="submit" value="submit" className="submit " />
    </React.Fragment>
  );
}

const RegisterForm = () => {
  return (
    <React.Fragment>
      <label for="username">username</label>
      <input type="text" id="username" placeholder="username" />
      <label for="email">Email</label>
      <input type="text" id="email" placeholder="Email"/>
      <label for="password">password</label>
      <input type="text" id="password" placeholder="password" />
      <label for="confirmpassword">confirm password</label>
      <input type="text" id="confirmpassword" placeholder="confirm password" />
      <input type="submit" value="submit" className="submit" />
    </React.Fragment>
  );
}

export default App;