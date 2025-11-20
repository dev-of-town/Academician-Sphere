"use client"
import React, { useState } from 'react'
import FollowBtn from './FollowBtn'
import styles from "../_styles/CommunityAbout.module.css";
import { useRef } from 'react';

const FollowContainer = ({followCount:fc,community_id,_id,isFollower,isTop}) => {
    const [followCount,setFollowCount] = useState(fc);
    const changeFollowCount = (num)=>{
        if(num>0){
            setFollowCount(followCount+1);
        }else{
            setFollowCount(followCount-1);
        }
    }
  return (
    <div className={styles.followContainer}>
        <div className={styles.followerCount}>
          <span>Followers </span>
          <span>{followCount}</span>
        </div>
        <div className={styles.followBtn}>
          <FollowBtn profileid={_id} isTop={isTop} changeFollowCount={changeFollowCount} followed={isFollower}/>
        </div>
      </div>
  )
}

export default FollowContainer