import React, { useState } from 'react'
import styles from '../_styles/SendDataBtn.module.css'
import { useRouter } from 'next/navigation';

const SendDataButton = ({formdata,data,children,url,style}) => {
    const [sending,setSending] = useState(false);
    const router = useRouter();
    const handleClick = async (e)=>{
        try{
            setSending(true);
            console.log(formdata.get("profile_img"),"This is profile img com");
            formdata.append("json",JSON.stringify(data));
            console.log(formdata);
            // console.log("Data sending...");
            const response = await fetch(url, {
                method: "POST", // *GET, POST, PUT, DELETE, etc.
                mode: "cors", // no-cors, *cors, same-origin
                body: formdata, // body data type must match "Content-Type" header
            });
            
            let res = await response.json();
            console.log(res);
            if(res.success){
                router.push(`/c/${res.community._id}`);
            }
        }catch(error){
            console.log(error);
        }finally{
            setSending(false);
        }
    }
  return (
    <button className={styles.btn} style={{style}} onClick={handleClick}>
        {sending&&<div className={styles.spinner}></div>}
        {children}
    </button>
  )
}

export default SendDataButton