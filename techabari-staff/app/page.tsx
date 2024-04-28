'use client';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from './dashboard/page';


const Home = () => {
  const router = useRouter();
  return(
  <h1 style={{fontSize:100, fontStyle:'italic'}}>I LOVE YOU</h1>
  );
};

export default Home;