import React from "react";
import defaultStyles from "../../_styles/Home.module.css";
import styles from "../../_styles/CommunityPage.module.css";
import Feed from "../../_components/Feed";
import CommunityAbout from "../../_components/CommunityAbout";
import Image from "next/image";
import OnlyForScroll from "./_components/OnlyForScroll";

const CommunityPage = ({ params }) => {
  let community = {
    id: 0,
    name: "The MSU",
    description:
      "This is one of the prestigeous university. fenufesikj, efwfjwnk am a k iawbfiu knfj wjfnawfiuwnfjnfjuwf f fuiaw  jk AEJNnkafjkasfbf sfias kjfdwaaidfkj sfbsiakj, fasfkas fjkbfkam fiaskj fasf km foajf j askjf KM  JDjd sjd skjf ajc jk",
    profileimg: "/msulogo412.png",
    templateimg: "/templateimg.jpeg",
    subcommunities: [1, 5],
    followers: 10000,
    parent: undefined,
  };
  return (
    <div className={styles.main}>
      <div className={styles.templateImage} id="templateimage">
        <Image
          src={"/templateimg.jpeg"}
          alt={"Template Image"}
          width={700}
          height={475}
          sizes="100vw"
          style={{
            width: "100%",
            height: "250px",
          }}
        />
      </div>
      <div className={defaultStyles.main}>
        <div className={defaultStyles.feed}>
          <Feed />
        </div>
        <div className={styles.aboutcommunity} id="communityAbout">
          <OnlyForScroll />
          <CommunityAbout community={community} />
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
