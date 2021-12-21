import styles from './Signup.module.css';
import { useState } from 'react';
import { useSignup } from '../../hooks/useSignup';

// todo:
// navigate after register

export default function Signup() {
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { signup, isPending, error } = useSignup();

  const inputChangeHandler = (e) => {
    setSignupInfo((prevSignupInfo) => ({
      ...prevSignupInfo,
      [e.target.name]: e.target.value
    }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    signup(signupInfo);
  };

  return (
    <form onSubmit={formSubmitHandler} className={styles['signup-form']}>
      <h2>Signup</h2>

      <label>
        <span>Name:</span>
        <input
          type='text'
          name='name'
          onChange={inputChangeHandler}
          value={signupInfo.name}
        />
      </label>

      <label>
        <span>E-mail:</span>
        <input
          type='email'
          name='email'
          onChange={inputChangeHandler}
          value={signupInfo.email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type='password'
          name='password'
          onChange={inputChangeHandler}
          value={signupInfo.password}
        />
      </label>

      <button type='submit' className='btn' disabled={isPending && true}>
        Sign Up
      </button>

      {isPending && <p>loading...</p>}
      {error && <p>{error}</p>}
    </form>
  );
}
