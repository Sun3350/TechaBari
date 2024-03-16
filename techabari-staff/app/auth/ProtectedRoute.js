// hooks/useAuth.js
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
  export const ProtectedRoute = ({children}) =>{
  const router = useRouter();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/loginpage');
    }
  }, []);

  return {children}
};

