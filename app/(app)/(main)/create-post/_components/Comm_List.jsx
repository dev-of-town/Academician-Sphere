import styles from "../_css/createPost.module.css";
import { Dropdown } from "react-bootstrap";
import { DropdownToggle, DropdownItem, DropdownMenu } from "react-bootstrap";
import CommunityComp from "./CommunityComp";
import axios from "./axios.jsx";
import { useState } from "react";



export default function Comm_List({user_communities,  crt_post, changeCon }) {




  const getCommData = async (cid) => {
    try {
      console.log("In get method");
      const res = await axios.get(`/c/`,crt_post.user_id);
      console.log(res.data);
      changeCon(user_communities.push({comm : res.data,selected:false}));
    } catch (error) {
      setIsError(error.message);
      console.error("this is error !!!", error.message);
    }
  };


  const getuserData = async () => {
    try {
      console.log("In get method");
      const res = await axios.get(`/u/`,crt_post.user_id);
      console.log(res.data);
      res.data.communities.map((cobj) => getCommData(cobj.community_id));
    } catch (error) {
      setIsError(error.message);
      console.error("this is error !!!", error.message);
    }
  };

  


  return (
    <div className="mt-3 float-end">
      <Dropdown>
        <DropdownToggle variant="success" id="dropdown-basic">
          Select communities
        </DropdownToggle>

        <DropdownMenu>
          <DropdownItem className="ms-2">
            <b>Communities</b>
          </DropdownItem>
          {user_communities.map((comm,index) => (
            <DropdownItem key={index}>
              <CommunityComp
                all_c={user_communities}
                changer = {
                  changeCon
                }
                user_community={comm}
                i={index}
              />
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
