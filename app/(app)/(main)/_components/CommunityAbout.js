import React from "react";
import styles from "../_styles/CommunityAbout.module.css";
import Image from "next/image";
import FollowBtn from "./FollowBtn";
import ProfileCard from "./ProfileCard";

const CommunityAbout = ({ community }) => {


  return (
    <div className={styles.container}>
      {/* <div className={styles.templateImg}>
          <Image
            src={community.templateimg}
            width={700}
            height={475}
            sizes="100vw"
            style={{
              width: "100%",
              height: "200px",
            }}
          />
        </div> */}
      <div className={styles.profile}>
        <div className={styles.profileImg}>
          <Image src={community.profileimg} width={50} height={50} />
        </div>
        <div className={styles.name}>
          <span>c/ </span> {community.name}
        </div>
      </div>
      <p className={styles.description}>{community.description}</p>
      <div className={styles.followContainer}>
        <div className={styles.followerCount}>
          <span>Followers </span>
          {community.followers}
        </div>
        <div className={styles.followBtn}>
          <FollowBtn />
        </div>
      </div>
      <div className={styles.modsContainer}>
        <h3>Moderators of Community:</h3>
        <ul className={styles.mods}>
          {/* {community.moderators.map((mods)=>{
            return <li><ProfileCard /></li>
          })} */}
          <li><ProfileCard community={"Karm Soni"} profileimage={"/next.svg"}/></li>
          <li><ProfileCard community={"Karm Soni"} profileimage={"/next.svg"}/></li>
        </ul>
      </div>
    </div>
  );
};

export default CommunityAbout;
