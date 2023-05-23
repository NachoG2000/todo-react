import React, {useState, useEffect} from 'react'
import './App.css'
import Menu from './Menu'

import darkDesktop from './images/bg-desktop-dark.jpg'
import lightDesktop from './images/bg-desktop-light.jpg'
import darkMobile from './images/bg-mobile-dark.jpg'
import lightMobile from './images/bg-mobile-light.jpg'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
      () => JSON.parse(localStorage.getItem("isDarkMode")) || false
  )

  function toggleDarkMode(){
    setIsDarkMode(prevState => !prevState)
  }

  useEffect(() => {
    localStorage.setItem("isDarkMode", JSON.stringify(isDarkMode))
  }, [isDarkMode])

  return (
    <main className="">
      <Menu isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} class="flex-none" />

      <div className="flex-grow flex flex-col">
        <img src={isDarkMode ? darkDesktop : lightDesktop} alt="desktopIMG" 
          className='w-full hidden sm:block' />
        <img src={isDarkMode ? darkMobile : lightMobile} alt="desktopIMG" 
          className='w-full sm:hidden' />

        <div className={`${isDarkMode ? "bg-gray-900" : "bg-white"} h-[200vh] lg:h-[100vh]`}></div>
      </div>
    </main>
  )
}

export default App