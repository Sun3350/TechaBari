import React from 'react'
import { useToggleTheme } from './layout';

const header = () => {
    const { theme, toggleTheme } = useToggleTheme();
  return (
    <div className='header-container'>
      <div className="Logo">
    <a href='#' className='Logo-text'>Techabari</a> 
        </div>
        <div className="user">
        <div>
     
     <button onClick={toggleTheme}>
     {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
     </button>
   
   </div>
        </div>
    </div>
  )
}

export default header
