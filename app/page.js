import React from 'react'
import styles from './styles/Home.module.css'
import Feed from './Components/Feed'

const Home = async () => {
  return (
    <div className={styles.main}>
      <Feed/>
    </div>
  )
}

export default Home