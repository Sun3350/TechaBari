'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const Home = () => {
  const router = useRouter();
  return(router.push('/dashboard'));
};

export default Home;
