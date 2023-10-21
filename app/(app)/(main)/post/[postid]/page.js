import React from "react";
import Post from "../../_components/Post";
import CommunityAbout from "../../_components/CommunityAbout";
import styles from '../../_styles/PostExtended.module.css'
import defaultStyle from '../../_styles/Home.module.css'


const PostExtended = () => {
  let dummy = {
    community: "The MSU",
    timeago: "3 hours",
    category: "event",
    profileimage: "/msulogo412.png",
    subject: "Hey This is Dummy Data",
    text: "Hello this is dummy text. I have been trying to write but i couldn't figure what to write so i ended up writing about why i am not writing?",
    img: "/dummypostimg.webp",
    votes: 123,
  };
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
    <div className={defaultStyle.main}>
      <div className={`${defaultStyle.feed} ${styles.post}`}>
        <Post data={dummy} />
      </div>
      <div className={styles.aboutcommunity}>
        <CommunityAbout community={community}/>
      </div>
    </div>
  );
};

export default PostExtended;
