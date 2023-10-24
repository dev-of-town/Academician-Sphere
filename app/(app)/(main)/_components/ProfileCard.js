import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "../_styles/ProfileCard.module.css";

const ProfileCard = ({ community, profileimage }) => {
  return (
    <div className={styles.profilecard}>
      <div className={styles.profimg}>
        <Image src={profileimage} alt={"MSU"} width={30} height={30} priority />
      </div>
      <div className={styles.username}>
        <Link href={`/u/${community.id}`} className={styles.userlinks}><span className={""}>u/</span>{community}</Link>
      </div>
    </div>
  );
};

export default ProfileCard;
