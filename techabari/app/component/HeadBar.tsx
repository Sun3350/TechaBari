import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faMoon, faSearch } from '@fortawesome/free-solid-svg-icons'
import './page.css'
const HeadBar = () => {
  return (
    <div className="w-full px-36 py-5 h-24 items-center justify-between font-mono bg-black fixed lg:flex">
      <h1>Techabari</h1>
      <div className='w-2/5'>
        <ul className='flex w-full items-center justify-between h-full'>
            <li>Technology</li>
            <li>FinTech</li>
            <li>Economy</li>
            <li>Robotic</li>
            <li>Robotic</li>
            <li>Robotic</li>
        </ul>
      </div>
      <div className='w-1/6 flex justify-between'>
        <div className='flex h-full w-fit flex-col justify-center items-center cursor-pointer'>
        <FontAwesomeIcon icon={faMoon} width={10}/>
       <p>Light Mode</p>
        </div>
        <div className='flex flex-col justify-center items-center cursor-pointer'>
        <FontAwesomeIcon icon={faSearch} width={10}/>
          Search
        </div>
        <div className='flex flex-col justify-center items-center cursor-pointer'>
        <FontAwesomeIcon icon={faBars} width={10}/>
          Menu
        </div>
      </div>
    </div>
  )
}

export default HeadBar
