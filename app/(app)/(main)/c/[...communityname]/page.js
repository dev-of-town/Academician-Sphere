import React from "react";
import defaultStyles from "../../_styles/Home.module.css";
import styles from "../../_styles/CommunityPage.module.css";
import Feed from "../../_components/Feed";
import CommunityAbout from "../../_components/CommunityAbout";
import Image from "next/image";
import OnlyForScroll from "./_components/OnlyForScroll";
import { cookies } from "next/headers";
import { getId } from "@/app/assets/Authorisation";
import axios from "axios";

async function getCommunityData(id,user_id) {
  try {
    console.log("In GET COM DATA", id);
    const res = await axios.post(`http://localhost:3000/api/get-community/${id}`, user_id,{
      headers:{
        'Content-Type': 'application/json',
      }
    });
    console.log(res.data.data, "MY RES");
    if (res.data.success) return res.data.data;
    return null;
  } catch (error) {
    console.log(error, "OOPS ERROR");
    return null;
  }
}

const CommunityPage = async ({ params: { communityname } }) => {
  const cookieStore = cookies();
  // console.log(,"MY COOKIE");
  const user_id = getId(cookieStore.get("access_token").value.toString());
  console.log(communityname.at(-1));
  let data = await getCommunityData(communityname.at(-1), user_id);
  const community = data.communityData;

  // let community = {
  // id: 0,
  // name: "The MSU",
  // description:
  //   "This is one of the prestigeous university. fenufesikj, efwfjwnk am a k iawbfiu knfj wjfnawfiuwnfjnfjuwf f fuiaw  jk AEJNnkafjkasfbf sfias kjfdwaaidfkj sfbsiakj, fasfkas fjkbfkam fiaskj fasf km foajf j askjf KM  JDjd sjd skjf ajc jk",
  // profileimg: "/msulogo412.png",
  // templateimg: "/templateimg.jpeg",
  // subcommunities: [1, 5],
  // followers: 10000,
  // parent: undefined,
  // };

  console.log(community, "----------This is Community");
  return (
    <div className={styles.main}>
      <div className={styles.templateImage} id="templateimage">
        <Image
          src={`${community.template_img.url?community.template_img.url:'/next.svg'}`}
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
          <Feed posts={data.communityPosts}/>
        </div>
        <div className={styles.aboutcommunity} id="communityAbout">
          <OnlyForScroll />
          <CommunityAbout community={community} data={data} />
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
