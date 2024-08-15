"use client"
import React, { useEffect } from "react";
import styles from "../_styles/sidebar.module.css";
import CommunityCard from "./CommunityCard";
import { useMenu } from "@/app/_contexts/MenuContext";
import CreateCommunityBtn from "./CreateCommunityBtn";
import { useState } from "react";

const Sidebar = () => {

  const {refSideMenu} = useMenu();

  const [communities,setCommunities] = useState([]);
  const [rerender,setRerender] = useState(true);

  useEffect(()=>{
    let t = setInterval(()=>{
      console.log("Here comes the times 1 ");
      if(localStorage.getItem("heirarchy-updated")!=0){
        console.log("Here comes the times 2 ");
        
        localStorage.setItem("heirarchy-updated","0")
        setRerender(!rerender);
      }
    },5000);
    fetch("/api/get-heirarchy").then(async (res)=>{
      const result = await res.json();
      console.log("((((((((((()))))))))))))",result.heirarchy);
      
      // if(result.status==200){
        setCommunities([...result.heirarchy])
        console.log(communities,"------------->");
        
      // }
    }).catch((error)=>{
      console.log(error);
    })
    return (()=>{
      clearInterval(t);
    })
  },[rerender]);
  

  return (
    <div className={`${styles.sidebar} translate-x-full`} ref={refSideMenu} >
      <div style={{backgroundColor:'transparent',width:'100%'}}>
        <CreateCommunityBtn />
      </div>
      <div className={styles.communitiesYouFollow}>
        {
          communities?.map((c)=>{
            return (
              <CommunityCard community={c} key={c._id}/>
            )
          })
        }
      </div>
    </div>
  );
};

export default Sidebar;
