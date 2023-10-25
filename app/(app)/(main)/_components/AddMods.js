import React, { useState,useEffect} from "react";
import SearchAddUserBar from "./SearchAddUserBar";
import styles from "../_styles/CreateCommunity.module.css";
import ProfileCard from "./ProfileCard";

const AddMods = ({ community }) => {
  const [moderators, setModerators] = useState([]);

  useEffect(() => {
    const { _id, profile_img, username } = JSON.parse(
      localStorage.getItem("user")
    );
    community.moderators.push(_id);
    setModerators([{ _id, profile_img, username, mySelf: true }]);
  }, []);

  return (
    <div className={styles.addmods}>
      <div className={styles.title}>Add Moderators :</div>
      <div className={styles.searchbar}>
        <SearchAddUserBar
          placeholder={"Add moderators"}
          moderators={moderators}
          setModerators={setModerators}
          community={community}
        />
      </div>
      <div className={styles.added}>
        {moderators.map((item, index) => {
          const handleClick = (e) => {
            let mods = moderators.filter((m) => {
              return m._id !== item._id;
            });
            community.moderators = [...mods];
            console.log(community, item);
            setModerators([...mods]);
          };
          return (
            <div style={{ display: "flex" }} key={index}>
              <ProfileCard
                className={styles.outputitem}
                name={item.username}
                id={item._id}
                profileimage={item.profile_img.url}
                isCommunity={false}
              />

              {!item.mySelf && (
                <button
                  onClick={handleClick}
                  style={{
                    border: "1px solid black",
                    padding: "5px",
                    marginLeft: "auto",
                    width: "25px",
                    height: "25px",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  -
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddMods;
