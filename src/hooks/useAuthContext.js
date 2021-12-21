import { useContext } from 'react';
import { AuthContext } from '../context/authContext';

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error('error in useAuthContext');

  return context;
};
