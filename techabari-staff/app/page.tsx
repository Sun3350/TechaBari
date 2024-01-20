'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    console.log('isAuthenticated:', isAuthenticated);

    if (!isAuthenticated) {
      console.log('Redirecting to /loginpage');
      router.push('/loginpage');
    } else {
      console.log('Redirecting to /dashboard'); // or any other route for the dashboard
      router.push('/dashboard');
    }
  }, [isAuthenticated]); // Add isAuthenticated as a dependency

  // No need to render anything here
  return null;
};

export default Home;
