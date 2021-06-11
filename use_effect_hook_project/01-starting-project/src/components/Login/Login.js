import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer = (state, action) => {
  if (action.type==="USER_INPUT"){
    return {value: action.val, isValid: action.val.includes('@')}
  }
  if (action.type==="ON_BLUR"){
    return {value: state.value, isValid: state.value.includes('@')}
  }
  return {value: '', isValid: false};
}
const passwordReducer = (state, action) => {
  if (action.type==="USER_INPUT"){
    return {value: action.val, isValid: action.val.length > 6}
  }
  if (action.type==="ON_BLUR"){
    return {value: state.value, isValid: state.value.length > 6}
  }
  return {value: '', isValid: false};
}
const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '', 
    isValid: undefined
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '', 
    isValid: undefined
  })

  // object destructuring
  const {isValid:emailIsValid} = emailState;
  const {isValid:passwordIsValid} = passwordState; // aliasing
  // 
  useEffect(()=> {
    const identifier = setTimeout(()=>{
      console.log('Checking form validity');
        setFormIsValid(
          emailState.isValid && passwordState.isValid
        )}

    , 500);
    console.log(identifier)
    return ()=>{
      console.log('clean up')
      clearTimeout(identifier); // does not let the setFormValid method run if the keypresses are between <500ms interval . 
    }

  }, [emailIsValid, passwordIsValid])
  // form validation for password

  // in a way these are replace ment for creating our own handdler for change of inputs
  // we use dto write onchangehandler inorder to check if the values in the input were valid 
  // on each change, now this side effect is being handled by useEffect when ever form changes. 
  const emailChangeHandler = (event) => {
    // setEnteredEmail(emailState.value);
    dispatchEmail({type:'USER_INPUT', val:event.target.value})
    // setFormIsValid(event.target.value.includes('@') && passwordState.value.length > 6)
    // however you must note that using the 
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({type:"USER_INPUT", val: event.target.value})
    // setFormIsValid(event.target.value.length > 6 && emailState.value.includes('@'));
    // keep in mind that emailState.value might have some previous value which is no more relevant. 
    // Therefore this code is not optimal. This is because the way react schedules the updates of states. 
  };

  const validateEmailHandler = () => {
    dispatchEmail({type: "ON_BLUR"})
    
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type: "ON_BLUR"})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
