import React, { useState } from 'react'
import styles from '../_styles/SendDataBtn.module.css'

const SendDataButton = ({data,children,url}) => {
    const [sending,setSending] = useState(false);
    const handleClick = async (e)=>{
        try{
            setSending(true);
            console.log("Data sending...");
            const response = await fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                headers: {
                //   "Content-Type": "application/json",
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            });
            
            console.log(await response.json());
        }catch(error){
            console.log(error);
        }finally{
            setSending(false);
        }
    }
  return (
    <button className={styles.btn} onClick={handleClick}>
        {sending&&<div className={styles.spinner}></div>}
        {children}
    </button>
  )
}

export default SendDataButton