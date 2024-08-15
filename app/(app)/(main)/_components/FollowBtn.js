"use client"
import React, { useState } from 'react'
import styles from '../_styles/FollowBtn.module.css'


// const followProfile = async (profileid)=>{
//     try {
//         const response = await fetch(url, {
//             method: "POST", // *GET, POST, PUT, DELETE, etc.
//             mode: "cors", // no-cors, *cors, same-origin
//             headers: {
//             //   "Content-Type": "application/json",
//               'Content-Type': 'application/x-www-form-urlencoded',
//             },
//             body: JSON.stringify(profileid), // body data type must match "Content-Type" header
//         });
//         throw await response.json();
//     } catch (error) {
//         throw Error("Something went wrong "+ error)
//     }
// }


const FollowBtn = ({profileid,followed,changeFollowCount,isTop}) => {
    const [isFollowed,setIsFollowed] = useState(followed);
    const handleClick = async ()=>{
        setIsFollowed(!isFollowed);
        console.log("isFollowed = "+isFollowed);
        if(isFollowed){
            changeFollowCount(-1);
        }else{
            changeFollowCount(1);
        }
        try{
            const response = await fetch(`/api/c/${profileid}/${isFollowed?"un":""}follow`, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                headers: {
                //   "Content-Type": "application/json",
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
            });
            const {success} = await response.json();
            if(!success){
                throw Error("Some Error Occured");
            }
        }catch(error){
            console.log(error);
            setIsFollowed(!isFollowed);
            changeFollowCount(-1);
        }   
    }

  return (
    <button className={styles.btn} onClick={handleClick}>
        {
            (
                isFollowed?"joined":"join"
            )
        }
    </button>
  )
}

export default FollowBtn