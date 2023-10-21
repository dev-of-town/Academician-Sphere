"use client";
import React, { useEffect, useRef, useState } from "react";
import ImageUploader from "../_components/ImageUploader";
import styles from "../_styles/CreateCommunity.module.css";
import btnclass from "../_styles/SendDataBtn.module.css";
import SearchAddUser from "../_components/SearchAddUser";
import CreateCommunityCard from "../_components/CreateCommunityCard";
import useNode from "../_hooks/useNode";
import SendDataButton from "../_components/SendDataButton";
// import { ToastContainer, toast } from "react-toastify";

const page = () => {
  const [communityData, setCommunityData] = useState({
    id: 1,
    name: "",
    description: "",
    subCommunities: [],
    users: [],
    expectedUsers: [],
  });

  let allRef = [];

  const { insertNode, deleteNode, editNode } = useNode();

  const handleInsertNode = (parentId) => {
    const finalStructure = insertNode(communityData, parentId);
    setCommunityData(finalStructure);
    console.log(communityData);
  };

  const handleEditNode = (id, community) => {
    const finalStructure = editNode(communityData, id, community);
    console.log(communityData);
  };

  const handleDeleteNode = (id) => {
    const finalStructure = deleteNode(communityData, id);
    const temp = { ...finalStructure };
    setCommunityData(temp);
    console.log(communityData);
  };

  const communityNameRef = useRef(null);

  let templateImage = new FormData();
  let profileImage = new FormData();

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.template}>
            <ImageUploader imageData={templateImage} />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.cont1}>
            <div className={styles.profileimg}>
              <ImageUploader imageData={profileImage} />
            </div>
            <div className={styles.addmods}>
              <div className={styles.title}>Add Moderators :</div>
              <div className={styles.searchbar}>
                <SearchAddUser />
              </div>
              <div className={styles.added}></div>
            </div>
            <div className={styles.btns}>
              <SendDataButton data={communityData} url={"/api/new-community"}>
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
              <CreateCommunityCard
                isRoot={true}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                communityNameRef={communityNameRef}
                handleEditNode={handleEditNode}
                community={communityData}
                allRef={allRef}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
