import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { clearToken } from '@/store/slices/authSlice';

export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    router.push('/auth/login');
    sessionStorage.removeItem('token');
    dispatch(clearToken());
  };

  return {
    logout,
  };
};
