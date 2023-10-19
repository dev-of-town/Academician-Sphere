"use client"
import React from "react";
import styles from "../_styles/sidebar.module.css";
import CommunityCard from "./CommunityCard";
import { useMenu } from "@/app/_contexts/MenuContext";
import CreateCommunityBtn from "./CreateCommunityBtn";

const Sidebar = () => {

  const {refSideMenu} = useMenu();

  let community = [
    {
      id: 0,
      name: "The MSU",
      profileimg: "/msulogo412.png",
      templateimg : "red",
      subcommunities: [1, 5],
      parent: undefined,
    },
    {
      id: 1,
      name: "Faculty Of Technology",
      profileimg: "/msulogo412.png",
      subcommunities: [2, 3, 4],
      parent: 0,
    },
    {
      id: 2,
      name: "Department Of Chem",
      profileimg: "/msulogo412.png",
      subcommunities: [],
      parent: 1,
    },
    {
      id: 3,
      name: "Department Of CSE",
      profileimg: "/msulogo412.png",
      subcommunities: [9],
      parent: 1,
    },
    {
      id: 4,
      name: "Department Of Mech",
      profileimg: "/msulogo412.png",
      subcommunities: [],
      parent: 1,
    },
    {
      id: 5,
      name: "Faculty Of Commerce",
      profileimg: "/msulogo412.png",
      subcommunities: [6, 7, 8],
      parent: 0,
    },
    {
      id: 6,
      name: "Department Of Accounting",
      profileimg: "/msulogo412.png",
      subcommunities: [],
      parent: 5,
    },
    {
      id: 7,
      name: "Department Of Something",
      profileimg: "/msulogo412.png",
      subcommunities: [],
      parent: 5,
    },
    {
      id: 8,
      name: "Department Of Another",
      profileimg: "/msulogo412.png",
      subcommunities: [],
      parent: 5,
    },
    {
      id: 9,
      name: "BE-3",
      profileimg: "/msulogo412.png",
      subcommunities: [10],
      parent: 3,
    },
    {
      id: 10,
      name: "Book Club",
      profileimg: "/msulogo412.png",
      subcommunities: [],
      parent: 9,
    },
  ];

  return (
    <div className={styles.sidebar} ref={refSideMenu}>
      <div style={{backgroundColor:'transparent',width:'100%'}}>
        <CreateCommunityBtn />
      </div>
      <div className={styles.communitiesYouFollow}>
        <CommunityCard communities={community} id={0} />
      </div>
    </div>
  );
};

export default Sidebar;
