'useclient'
import React, {useEffect} from 'react'
import {store} from './store'
import {Provider} from 'react-redux'

export const  ProviderRoute = ({children} : {children:  React.ReactNode}) =>
{

 return <Provider store={store}>
 {children}
 </Provider>

}