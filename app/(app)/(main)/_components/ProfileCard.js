import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../_styles/ProfileCard.module.css";

const ProfileCard = ({ name,id, profileimage,isCommunity}) => {
  return (
    <div className={styles.profilecard}>
      <div className={styles.profimg}>
        <Image src={profileimage?profileimage:'/next.svg'} alt={"MSU"} width={30} height={30} priority />
      </div>
      <div className={styles.username}>
        <Link href={`/${isCommunity?"c":"u"}/${id}`} className={styles.userlinks}><span className={""}>{isCommunity?"c/":"u/"}</span>{name}</Link>
      </div>
    </div>
  );
};

export default ProfileCard;
