import React from "react";
import styles from "../styles/CommunityAbout.module.css";
import Image from "next/image";

const CommunityAbout = ({ community }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.templateImg}>
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
        </div>
        <div className={styles.profile}>
          <div className={styles.profileImg}>
            <Image src={community.profileimg} width={75} height={75} />
          </div>
          <div className={styles.name}>
            <span>c/ </span> {community.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityAbout;
