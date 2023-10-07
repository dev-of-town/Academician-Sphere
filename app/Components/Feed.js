import React from 'react'
import styles from '../styles/Feed.module.css'
import Post from './Post'

const Feed = () => {
    let dummy = {
        community: "The MSU",
        timeago: "3 hours",
        category: "event",
        profileimage: "/msulogo412.png",
        subject: "Hey This is Dummy Data",
        text: "Hello this is dummy text. I have been trying to write but i couldn't figure what to write so i ended up writing about why i am not writing?",
        img: "/dummypostimg.webp",
        votes: 123,
      };
      let textdummy = {...dummy};
      textdummy["img"] = undefined;
  return (
    <div className={styles.feed}>
        <Post data={dummy}/>
        <Post data={textdummy}/>
    </div>
  )
}

export default Feed