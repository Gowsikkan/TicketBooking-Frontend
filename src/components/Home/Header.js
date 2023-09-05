import React from 'react'
import '../../style.css'
import './Header.css'


function Header() {
  

  return (
    <div>
    <header>
    <a href="/" class="logo"><i class="fas fa-utensils"></i>BOOK-YOUR-SHOW</a>

    <nav class="navbar">
        <a href='/'>logout</a>
        
    </nav>
    </header>
    </div>
  )
}

export default Header
