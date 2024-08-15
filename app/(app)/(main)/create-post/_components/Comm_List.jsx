import styles from "../_css/createPost.module.css";
import { Dropdown } from "react-bootstrap";
import { DropdownToggle, DropdownItem, DropdownMenu } from "react-bootstrap";
import CommunityComp from "./CommunityComp";
import axios from "./axios.jsx";
import { useState, useEffect } from "react";

export default function Comm_List({ userCommunity,setUserCommunity }) {
    // let [user_communities, changeCon] = useState([]);


  // const getCommData = async (cid) => {
  //   try {
  //     console.log("In get method");
  //     const res = await axios.get(`/c/`,crt_post.user_id);
  //     console.log(res.data);
  //     changeCon(user_communities.push({comm : res.data,selected:false}));
  //   } catch (error) {
  //     setIsError(error.message);
  //     console.error("this is error !!!", error.message);
  //   }
  // };

  // const getuserData = async () => {
  //   try {
  //     console.log("In get method, Comm_list");
  //     const res = await axios.get(`/u/`,crt_post.user_id);
  //     console.log(res.data);
  //     res.data.communities.map((cobj) => getCommData(cobj.community_id));
  //   } catch (error) {
  //     setIsError(error.message);
  //     console.error("this is error !!!", error.message);
  //   }
  // };

  useEffect(() => {
    // changeCon([
    //   ...user_communities,
    //   {
    //     comm: { name: "Cricket1", participants: ["h", "h", "l"] },
    //     selected: true,
    //   },
    //   {
    //     comm: { name: "Cricket1", participants: ["h", "h", "l"] },
    //     selected: true,
    //   },
    //   {
    //     comm: { name: "Cricket1", participants: ["h", "h", "l"] },
    //     selected: true,
    //   },
    // ]);
      const id = JSON.parse(localStorage.getItem("user"))._id; 
      let data;
      fetch(`http://localhost:4041/u/${id}/get-following-community`).then(async (res)=>{
        data = await res.json();
        console.log(data);
        let coms = data.followingCommunity.map((c)=>{
          c.selected = false;
          return c;
        })
        // console.log(coms);
        // userCommunity.coms = coms;
        console.log(userCommunity,"Hello");
        setUserCommunity([...coms]);
      }).catch((error)=>{
        console.log(error);
      });


  }, []);

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
          {userCommunity.map((comm, index) => (
            <DropdownItem key={index}>
              <CommunityComp
                all_c={userCommunity}
                changer={setUserCommunity}
                user_community={comm}
                i={index}
                usercoms={userCommunity}
                key={index}
              />
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
