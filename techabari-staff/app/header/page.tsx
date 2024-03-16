import React from 'react'
import { useToggleTheme } from '../layout';
import './header.css'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/navigation';
const header = () => {
  const router = useRouter()
    const { theme, toggleTheme } = useToggleTheme();
  return (
    <div className='header-container'>
      <div className="Logo">
    <div onClick={() => router.push('/')} className='header-logo'>Techabari</div> 
        </div>
        <div className="user">
        <div>
     
     <button onClick={toggleTheme}>
     {theme === 'light' ? (<FontAwesomeIcon className="icon" icon={faMoon} />) : (<FontAwesomeIcon className="icon" icon={faSun} />)}
     </button>
   
   </div>
        </div>
    </div>
  )
}

export default header
function useNavigation() {
  throw new Error('Function not implemented.');
}

