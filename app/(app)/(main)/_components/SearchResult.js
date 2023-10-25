import React from "react";
import styles from "../_styles/SearchBar.module.css";
import ProfileCard from "./ProfileCard";

const SearchResult = ({ output, refOutput }) => {
  console.log(output);
  return (
    <div className={styles.searchoutput} ref={refOutput}>
      {output &&
        output.communities &&
        output.communities.map((item, index) => {
          return (
            <li className={styles.list}>
              <ProfileCard
                className={styles.outputitem}
                name={item.name}
                id={item._id}
                profileimage={item.profile_img.url}
                isCommunity={true}
                key={index}
              />
            </li>
          );
        })}

      {output &&
        output.users &&
        output.users.map((item, index) => {
          return (
            <li className={styles.list}>
              <ProfileCard
                className={styles.outputitem}
                name={item.username}
                id={item._id}
                profileimage={item.profile_img.url}
                isCommunity={false}
                key={index}
              />
            </li>
          );
        })}
    </div>
  );
};

export default SearchResult;
