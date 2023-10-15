"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import styles from "../styles/CommunityCard.module.css";

const CommunityCard = ({ communities, id }) => {

    const [isOpen, setIsOpen] = useState(false);
  let x = communities.filter((com) => com.parent === id);
  let donot = (!isOpen || x.length === 0);
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {x.length == 0 || <button onClick={()=>setIsOpen(!isOpen)}>{isOpen?"-":"+"}</button>}
        {!id && (
          <div className={styles.profileimg}>
            <Image src={communities[id].profileimg} width={35} height={35} />{" "}
          </div>
        )}
        <Link href="/">{communities[id].name}</Link>
      </div>
      { donot || (
        <div className={`${styles.subcontainer}`} style={{height:(isOpen)?"100%":"0%"}}>
          {x.map((ele) => (
            <CommunityCard communities={communities} id={ele.id} key={ele.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunityCard;
