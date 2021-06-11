import React, { useState } from 'react';

import Button from '../../UI/Button/Button';
import styles from './CourseInput.module.css';
// import styled from 'styled-components';



// const FormControl = styled.div`
//   margin: 0.5rem 0;

// & label {
//   font-weight: bold;
//   display: block;
//   margin-bottom: 0.5rem;
//   color: ${props => props.valid ? 'black' : 'red'};
// }

// & input {
//   display: block;
//   width: 100%;
//   border: 1px solid ${props => props.valid ? '#ccc' : 'red'};
//   font: inherit;
//   line-height: 1.5rem;
//   padding: 0 0.25rem;
// }

// & input:focus {
//   outline: none;
//   background: #fad0ec;
//   border-color: #8b005d;
// }
// `;

function CourseInput(props){
  const [enteredValue, setEnteredValue] = useState('');
  const [isValid, setValid] = useState(true);

  const goalInputChangeHandler = event => {
    setEnteredValue(event.target.value);
    if(enteredValue.length > 0){
      setValid(true);           
    }
  };

  const formSubmitHandler = event => {
    event.preventDefault();
    if(enteredValue.length === 0){
      setValid(false);
    }else{
      props.onAddGoal(enteredValue);
      setValid(true);
      setEnteredValue('');
    }
  };



  return (
    <form onSubmit={formSubmitHandler}>
      <div valid={isValid} className={`${styles['form-control']} ${!isValid && styles.invalid }`}>
        <label>Course Goal</label>
        <input type="text" 
        onChange={goalInputChangeHandler}
        value={enteredValue}
         />
      </div>
      <Button type="submit">Add Goal</Button>
    </form>
  );
};

export default CourseInput;
