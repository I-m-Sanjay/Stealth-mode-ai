import { useState } from 'react';
import type { ILoginResponse } from '../interface/IAuth';
import type { ILoginCredentials } from '../interface/IAuth';
import { doLogin } from '../api/services/authService';
import { useAppDispatch } from '../store/hooks';
import { login, setLoading, setError } from '../store/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export const useLogin = () => {
  const [loading, setLoadingState] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [data, setData] = useState<ILoginResponse | null>(null);
  const [error, setErrorState] = useState<null | string>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const processLogin = async (payload: ILoginCredentials): Promise<boolean> => {
    setLoadingState(true);
    dispatch(setLoading(true));
    try {
      const response = await doLogin(payload);
      if (response.success) {
        setData(response);
        dispatch(login(response));
        setIsSuccess(true);
        setErrorState(null);
        dispatch(setError(null));
        // Navigate to dashboard or home page
        navigate('/');
        return true; // Return success
      } else {
        throw new Error(response.message || 'Login failed');
      }
    } catch (e) {
      console.error('Login error:', e);
      const errorMessage = (e as Error).message || 'Login failed';
      setErrorState(errorMessage);
      dispatch(setError(errorMessage));
      return false; // Return failure
    } finally {
      setLoadingState(false);
      dispatch(setLoading(false));
    }
  };

  return { loading, isSuccess, data, error, processLogin };
}; 