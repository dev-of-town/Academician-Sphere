"use client"
import React, { useState } from 'react'
import styles from '../_styles/FollowBtn.module.css'


const followProfile = async (profileid)=>{
    try {
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            headers: {
            //   "Content-Type": "application/json",
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify(profileid), // body data type must match "Content-Type" header
        });
        throw await response.json();
    } catch (error) {
        throw Error("Something went wrong "+ error)
    }
}


const FollowBtn = ({profileid,followed}) => {
    const [follow,setFollow] = useState(followed);
    const handleClick = async ()=>{
        setFollow(!follow);
        try{
            const response = await fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                headers: {
                //   "Content-Type": "application/json",
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(profileid), // body data type must match "Content-Type" header
            });
            const {success} = await response.json();
            if(!success){
                setFollow(!follow);
            }
        }catch(error){
            console.log(error);
            setFollow(!follow);
        }   
    }

  return (
    <button className={styles.btn} onClick={handleClick}>
        {follow?'followed':'follow'}
    </button>
  )
}

export default FollowBtn