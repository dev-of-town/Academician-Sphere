import React, { useState } from 'react'


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
    const [optimisticFollow,setOptimisticFollow] = useState(follow);

    const handleClick = async ()=>{
        setOptimisticFollow(!optimisticFollow);
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
                setOptimisticFollow(!optimisticFollow);
            }
        }catch(error){
            console.log(error);
            setOptimisticFollow(!optimisticFollow);
        }   
    }

  return (
    <button className={styles.btn} onClick={handleClick}>
        {optimisticFollow?'followed':'follow'}
    </button>
  )
}

export default FollowBtn