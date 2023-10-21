"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import styles from "../_styles/CommunityCard.module.css";

const CommunityCard = ({ communities, id }) => {
  const subRef = useRef(null);
  let x = communities.filter((com) => com.parent === id);
  let doNotShow = x.length === 0;
  const btnRef = useRef(null);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {doNotShow || <button style={{fontSize:'1.3rem'}} ref={btnRef} onClick={() => {
          let list = subRef.current.classList;
          if(list.contains("h-0")){
            list.remove("h-0");
            btnRef.current.textContent = "-";
          }else{
            list.add("h-0");
            btnRef.current.textContent = "+";
          }
        }}>{"+"}</button>}
        {!id && (
          <div className={styles.profileimg}>
            <Image src={communities[id].profileimg} width={35} height={35} />{" "}
          </div>
        )}
        <Link href="/">{communities[id].name}</Link>
      </div>
      {doNotShow || (
        <div className={`${styles.subcontainer} h-0`} ref={subRef}>
          {x.map((ele) => (
            <CommunityCard communities={communities} id={ele.id} key={ele.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityCard;
