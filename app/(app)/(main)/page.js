
import React from "react";
import styles from "./_styles/Home.module.css";
import Feed from "./_components/Feed";
import axios from "axios";
import TopCommunities from "./_components/TopCommunities";

async function getPostData() {
  try {
    console.log("In GET Post DATA");
    const res = await fetch(`http://localhost:4041/get-random-post`,{
      cache: 'no-store'
    });

    const data = await res.json();
    console.log(data,"-------------------------------");
    return {...data};

    return {};

    // headers:{
    //   'Content-Type': 'application/json',
    // }
    //  });
    // console.log(res.data.data, "MY RES");
    // if (res.data.success) return res.data.data;
    // return null;
  } catch (error) {
    console.log(error, "OOPS ERROR");
    return {};
  }
}

const Home = async () => {
  // let community = {
  //   id: 0,
  //   name: "The MSU",
  //   profileimg: "/msulogo412.png",
  //   templateimg: "/templateimg.jpeg",
  //   subcommunities: [1, 5],
  //   parent: undefined,
  // };

  const data = await getPostData();

  return (
    <div className={styles.main}>
      <div className={styles.feed}>
        <Feed posts={data.data} />
      </div>
      <div className={styles.aboutcommunity}>
        <TopCommunities />
      </div>
    </div>
  );
};

export default Home;
