import React from "react";
import styles from "../_styles/CommunityAbout.module.css";
import Image from "next/image";
import FollowBtn from "./FollowBtn";
import ProfileCard from "./ProfileCard";

const CommunityAbout = ({ community,data }) => {


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
          <Image src={community.profile_img.url?community.profile_img.url:'/next.svg'} width={50} height={50} />
        </div>
        <div className={styles.name}>
          <span>c/ </span> {community.name}
        </div>
      </div>
      <p className={styles.description}>{community.description}</p>
      <div className={styles.followContainer}>
        <div className={styles.followerCount}>
          <span>Followers </span>
          {data.numberOfFollowers}
        </div>
        <div className={styles.followBtn}>
          <FollowBtn profileid={community._id} followed={data.isFollower}/>
        </div>
      </div>
      <div className={styles.modsContainer}>
        <h5>Moderators of Community:</h5>
        <div className={styles.mods}>
          {data.communityModerators.map((mods,index)=>{
            return <li key={index}><ProfileCard name={mods.username} id={mods._id} profileimage={mods.profile_img.url}/></li>
          })}
          {/* <li><ProfileCard community={"Karm Soni"} profileimage={"/next.svg"}/></li>
          <li><ProfileCard community={"Karm Soni"} profileimage={"/next.svg"}/></li> */}
        </div>
      </div>
    </div>
  );
};

export default CommunityAbout;
