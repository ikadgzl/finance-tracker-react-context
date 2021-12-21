import { useEffect, useState } from 'react';
import { projectAuth } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async ({ email, password }) => {
    setError(null);
    setIsPending(true);

    try {
      // projectAuth throwing new error if not found in the db, goes directly into the catch phase
      // no need to explicitly throw new err.
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      console.log(res);

      dispatch({ type: 'LOGIN', payload: res.user });

      if (!isCancelled) {
        setIsPending(false);
        setError(false);
      }
    } catch (error) {
      if (!isCancelled) {
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      setIsCancelled(true);
    };
  }, []);

  return { login, isPending, error };
};
