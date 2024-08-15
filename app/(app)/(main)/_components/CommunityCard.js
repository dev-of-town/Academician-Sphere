"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import styles from "../_styles/CommunityCard.module.css";

const CommunityCard = ({ community }) => {
  const subRef = useRef(null);
  // let x = communities.filter((com) => com.parent === id);
  let doNotShow = community?.sub_communities?.length === 0;
  const btnRef = useRef(null);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {<button style={{fontSize:'1.3em'}} ref={btnRef} onClick={() => {
          if(community?.sub_communities?.length===0) return
          let list = subRef.current.classList;
          if(list.contains("h-0")){
            list.remove("h-0");
            btnRef.current.textContent = "-";
          }else{
            list.add("h-0");
            btnRef.current.textContent = "+";
          }
        }}>{doNotShow?">":"+"}</button>}
        {
          <div className={styles.profileimg}>
            <Image src={community?.profile_img.url} width={25} height={25} alt="+" />{" "}
          </div>
        }
        <Link href={"/c/"+community.community_id}>{community?.name}</Link>
      </div>
      {doNotShow || (
        <div className={`${styles.subcontainer} h-0`} ref={subRef}>
          {community?.sub_communities?.map((c) => {
            return (
              <CommunityCard community={c} key={c._id} />
            )
          })}
        </div>
      )}
    </div>
  );
};

export default CommunityCard;
