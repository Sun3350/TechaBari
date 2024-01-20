'useclient'
import React, {useEffect} from 'react'
import {persistor, store} from './store'
import { PersistGate } from 'redux-persist/integration/react';


export const  PersistRoute = ({children} : {children:  React.ReactNode}) =>
{

 return <PersistGate persistor={persistor}>
 {children}
 </PersistGate>

}