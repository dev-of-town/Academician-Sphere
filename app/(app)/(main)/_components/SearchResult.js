import React from "react";
import styles from "../_styles/SearchBar.module.css";
import ProfileCard from "./ProfileCard";

import { faShare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const SearchResult = ({ output, refOutput, isFromCreateProject, newProject, setNewProject }) => {
  console.log(output);
  function addUser(user) {
    let tempArray = newProject.members;
    const newMember = {
      _id: user._id,
      username: user.username
    }
    tempArray.push(newMember);
    setNewProject((newProject)=>({...newProject, members: tempArray}));
  }
  return (
    <div className={`${styles.searchoutput} h-0`} ref={refOutput} onClick={()=>{
        refOutput.current.classList.add("h-0");
        refOutput.current.classList.remove("border-1");
    }}>
      {
        output.communities?.length===0 && output.users?.length===0 && <div>No Data Found</div>
      }

      {output &&
        output.communities &&
        output.communities.map((item, index) => {
          return (
            <li className={styles.list}>
              <ProfileCard
                className={styles.outputitem}
                name={item.name}
                id={item.community_id}
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
              {
                isFromCreateProject && !newProject.members.some(obj => obj._id === item._id) && (
                  <div onClick={()=>addUser(item)}>
                      <FontAwesomeIcon className={styles.addIcon} icon={faShare} />
                  </div>
                )
              }
            </li>
          );
        })}
    </div>
  );
};

export default SearchResult;
