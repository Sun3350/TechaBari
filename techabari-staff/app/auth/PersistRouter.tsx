'useclient'
import React, {useEffect} from 'react'
import {persistor, store} from './store'
import { PersistGate } from 'redux-persist/integration/react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export const  PersistRoute = ({children} : {children:  React.ReactNode}) =>
{
    const router = useRouter();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/loginpage');
      }
    }, []);
 return <PersistGate persistor={persistor}>
 {children}
 </PersistGate>

}