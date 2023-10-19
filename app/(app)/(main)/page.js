import React from 'react'
import styles from './_styles/Home.module.css'
import Feed from './_components/Feed'
import CommunityAbout from './_components/CommunityAbout'
import axios from 'axios'

const Home = async () => {
  
  let community = {
    id: 0,
    name: "The MSU",
    profileimg: "/msulogo412.png",
    templateimg : "/templateimg.jpeg",
    subcommunities: [1, 5],
    parent: undefined,
  };

  return (
    <div className={styles.main}>
      <div className={styles.feed}>
        <Feed/>
      </div>
      <div className={styles.aboutcommunity}>
        <CommunityAbout community={community}/>
      </div>
    </div>
  )
}

export default Home