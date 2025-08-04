import React from 'react'
import SearchInput from '../SearchInput/SearchInput'
import './Header.scss'
import Link from 'next/link'
const Header = () => {
  return (
   <div className='header'>
        <Link href={'/'} className='title'>Weather Forecast</Link>
        <div className='search-bar-container'>
            <SearchInput />
        </div>
    </div>
  )
}

export default Header