"use client"

import React from 'react'
import Navbar from './Components/Navbar'
import styles from './styles/center.module.css'
import Sidebar from './Components/Sidebar'



const Home = () => {
  return (
    <>
      <Navbar/>    
      <div className={styles.center}>
        <Sidebar/>
      </div>   
    </>
  )
}

export default Home