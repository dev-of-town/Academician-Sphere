import MenuProvider from "@/app/_contexts/MenuContext";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import styles1 from "./_styles/center.module.css";
import React from "react";
import styles from "./_styles/Home.module.css";
import Feed from "./_components/Feed";
import CommunityAbout from "./_components/CommunityAbout";
import axios from "axios";
import TopCommunities from "./_components/TopCommunities";

function getUserData() {}

const Home = async () => {
  let community = {
    id: 0,
    name: "The MSU",
    profileimg: "/msulogo412.png",
    templateimg: "/templateimg.jpeg",
    subcommunities: [1, 5],
    parent: undefined,
  };

  return (
    <>
      <MenuProvider>
        <Navbar />
        <main className={styles1.main}>
          <div className={styles1.center}>
            <Sidebar />

            <div className={styles.main}>
              <div className={styles.feed}>
                <Feed />
              </div>
              <div className={styles.aboutcommunity}>
                <TopCommunities />
              </div>
            </div>
          </div>
        </main>
      </MenuProvider>
    </>
  );
};

export default Home;
