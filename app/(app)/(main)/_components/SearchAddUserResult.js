import React, { useRef, useState } from "react";
import styles from "../_styles/SearchBar.module.css";
import specs from "../_styles/SearchAddUser.module.css";
import Image from "next/image";
import ProfileCard from "./ProfileCard";


const SearchAddUserResult = ({
  maxHeight,
  top,
  output,
  refOutput,
  setModerators,
  moderators,
  community,
}) => {
  return (
    <div
      className={`${styles.searchoutput} ${specs.searchoutput} h-0`}
      style={{ maxHeight, top }}
      ref={refOutput}
    >
      {output?.length===0 && <div>No User Found</div>}

      {output &&
        output.map((item,index) => {
            const handleClick = (e)=>{
                if(!community.moderators.includes(item._id)){
                    community.moderators.push(item._id);
                    setModerators([...moderators,item]);
                }
            }
          return (
              <li className={styles.list} style={{display:"flex"}} key={index}>
                <ProfileCard
                  className={styles.outputitem}
                  name={item.username}
                  id={item._id}
                  profileimage={item.profile_img.url}
                  isCommunity={true}
                />
                <button onClick={handleClick} className={specs.add}>
                    Add
                </button>
              </li>
          );
        })}
    </div>
  );
};

export default SearchAddUserResult;
