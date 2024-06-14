"use client";
import React, { useEffect, useRef, useState } from "react";
import ImageUploader from "../_components/ImageUploader";
import styles from "../_styles/CreateCommunity.module.css";
import btnclass from "../_styles/SendDataBtn.module.css";
import SearchAddUser from "../_components/SearchAddUserInput";
import CreateCommunityCard from "../_components/CreateCommunityCard";
import useNode from "../_hooks/useNode";
import SendDataButton from "../_components/SendDataButton";
import CommunityHierarchy from "../_components/CommunityHierarchy";
import AddMods from "../_components/AddMods";
// import { ToastContainer, toast } from "react-toastify";

const page = () => {

  let community = {
    community_id: new Date().getTime(),
    name: "",
    description: "",
    sub_communities: [],
    allowed_participants: [],
    moderators : []
  };
 
  const communityNameRef = useRef(null);

  let formdata = new FormData();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.template}>
            <ImageUploader imageData={formdata} fieldName={"template_img"} />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.cont1}>
            <div className={styles.profileimg}>
              <ImageUploader imageData={formdata} fieldName={"profile_img"} />
            </div>
            <AddMods community={community} />
            <div className={styles.btns}>
              <SendDataButton formdata={formdata} data={community} url={"/api/new-community"}>
                Submit
              </SendDataButton>
              <button
                className={btnclass.btn}
                style={{ backgroundColor: "red" }}
              >
                Cancel
              </button>
            </div>
          </div>
          <div className={styles.cont2}>
            {/* <div className={`${styles.outline} ${styles.communityname}`}>
              <div> c/ </div>
              <div ref={communityNameRef}></div>
            </div> */}
            <div className={styles.createHierarchy}>
              <CommunityHierarchy community={community} communityNameRef={communityNameRef} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
