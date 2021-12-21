import { useState } from 'react';
import { useLogin } from '../../hooks/useLogin';
import styles from './Login.module.css';

export default function Login() {
  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });

  const { login, isPending, error } = useLogin();

  const inputChangeHandler = (e) => {
    setLoginInfo((prevLoginInfo) => ({
      ...prevLoginInfo,
      [e.target.name]: e.target.value
    }));
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    login(loginInfo);
  };

  return (
    <form onSubmit={formSubmitHandler} className={styles['login-form']}>
      <h2>Login</h2>

      <label>
        <span>E-mail:</span>
        <input
          type='email'
          name='email'
          onChange={inputChangeHandler}
          value={loginInfo.email}
        />
      </label>

      <label>
        <span>Password:</span>
        <input
          type='password'
          name='password'
          onChange={inputChangeHandler}
          value={loginInfo.password}
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
