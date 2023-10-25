import React, { useEffect, useMemo, useState, useRef } from "react";
import styles from "../_styles/CreateCommunityCard.module.css";
import SearchContextProvider, {
  SearchContext,
} from "@/app/_contexts/SearchAddUserContext";
import SearchBar from "./SearchInput";
import SearchAddUser from "./SearchAddUser";

const CreateCommunityCard = ({
  community,
  isError,
  setIsError,
  isRoot,
  handleDeleteNode,
  handleInsertNode,
  handleEditNode,
  communityNameRef,
  allRef,
}) => {
  let comm = {
    name: "",
    description: "",
  };

  const descRef = useRef(null);

  allRef.push(useRef(null));

  const onAddSubCommunity = (e) => {
    allRef.forEach((element) => {
      element.current.classList.add("h-0");
    });
    handleInsertNode(community.id);
  };

  const onDeleteSubCommunity = (e) => {
    handleDeleteNode(community.id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <button className={styles.addbtn} onClick={onAddSubCommunity}>
            +
          </button>
        </div>
        <div className={styles.comminfo}>
          <div className={`${styles.outline} ${styles.title}`}>
            {isRoot && <div>c/</div>}
            <input
              type={"text"}
              className={styles.commnameinput}
              onChange={(e) => {
                comm = { ...comm, name: e.target.value };
                handleEditNode(community.id,comm)
                // console.log(comm);
                if(isRoot){
                    // communityNameRef.current.textContent = comm.name;
                }
              }}
              placeholder="enter community name"
              onFocus={(e) => {
                // console.log("Focus",e);
                allRef.forEach((element) => {
                  element.current.classList.add("h-0");
                });
                e.target.parentElement.parentElement.childNodes[1].classList.remove(
                  "h-0"
                );
              }}
            />
            {!isRoot && (
              <button
                className={styles.deleteBtn}
                onClick={onDeleteSubCommunity}
              >
                -
              </button>
            )}
          </div>
          <div className={styles.slider} ref={allRef.at(-1)}>
            <div className={styles.commdesc}>
              <textarea
                ref={descRef}
                className={styles.outline}
                placeholder={`Write Description for Community`}
                rows={5}
                cols={100}
                maxLength={200}
                onChange={(e) => {
                  comm = { ...comm, description: e.target.value };
                  handleEditNode(community.id,comm);
                }}
              ></textarea>
            </div>
            {/* <div className={styles.adduser}>
              <div className={styles.addedusers}>
                {!comm.users || <span>Add users to Community</span>}
              </div>
              <div className={styles.searchbar}>
                <SearchAddUser
                  placeholder={`Search users to add`}
                  maxHeight={"150px"}
                  top={"40px"}
                />
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className={styles.subContainer}>
        {community.sub_communities.map((c) => {
          return (
            <CreateCommunityCard
              community={c}
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              handleEditNode={handleEditNode}
              allRef={allRef}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CreateCommunityCard;
