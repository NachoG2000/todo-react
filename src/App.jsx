import React, {useState} from 'react'
import './App.css'
import Menu from './Menu'

import darkDesktop from './images/bg-desktop-dark.jpg'
import lightDesktop from './images/bg-desktop-light.jpg'
import darkMobile from './images/bg-mobile-dark.jpg'
import lightMobile from './images/bg-mobile-light.jpg'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  function toggleDarkMode(){
    setIsDarkMode(prevState => !prevState)
  }
  return (
    <main>
      <Menu isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div>
        <img src={isDarkMode ? darkDesktop : lightDesktop} alt="desktopIMG" 
             className='w-full hidden sm:block' />
        <img src={isDarkMode ? darkMobile : lightMobile} alt="desktopIMG" 
             className='w-full sm:hidden' />
      </div>

      <div className={`${isDarkMode ? "bg-gray-900" : "bg-white"} min-h-[100vh]`}></div>
    </main>
  )
}

export default App