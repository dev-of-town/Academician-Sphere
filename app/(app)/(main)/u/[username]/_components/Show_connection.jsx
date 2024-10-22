"use client";
import Link from "next/link";
import styles from "../_css/Profile.module.css";

import { useState, useEffect } from "react";

// const getData = async (id) => {
//   try {
//     console.log("In get method");
//     const res = await (await axios.get(`http://localhost:4041/u/${id}/get-following-community`)).json();
//     console.log(res, res.followingCommunity, 123);
//     if (res.success) {
//       return res.followingCommunity;
//     }
//     return null;
//   } catch (error) {
//     // setIsError(error.message);
//     console.error("this is error !!!", error.message);
//     return null;
//   }
// };

export default function Show_connection({ id }) {
  const [userlist,setUserlist] = useState([]);



  useEffect(() => {
    // console.log("hello ", window.location.href);
    //  getData()
    // list.map((lid) =>
    //   getData(lid.id)
    //     .then((res) => {
    //       console.log(res, "In getData dhruv");
    //       if (res !== null) {
    //         userlist.push({
    //           username: res.data.username,
    //           about: res.data.about,
    //           profile_img: res.data.profile_img,
    //         });
    //       }

    //       // console.log(profile_demo,"Profile demo");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     })
    // );

    //const id = JSON.parse(localStorage.getItem("user"))._id; 
    console.log("Id in get",id)
    let data;
    fetch(`http://localhost:4041/u/${id}/get-following-community`).then(async (res)=>{
      data = await res.json();
      console.log(data,"My data---------------------------");
      // userlist = [...data.followingCommunity];
      setUserlist(data.followingCommunity);
      console.log(userlist,"My follow---------------------------");
      // console.log(coms);
     // changeCon(coms);
    }).catch((error)=>{
      console.log(error);
    });
  }, [id]);

  console.log(userlist,"My list-------------------");

  return (
  userlist!=null &&   <div className="p-3" style={{ maxHeight: "500px", overflowY: "scroll" }}>
      {userlist.length > 0 &&
        userlist.map((list_item) => (
          <div>
            <div className={`d-flex  ${styles.list}`}>
              <img
                src={list_item.profile_img.url}
                className={styles.list_img}
              />
              <div>
                <Link className={styles.connection_username} href={`/c/${list_item.community_id}`}>
                  {list_item.name}
                </Link>
                <div className={styles.remarks}>{list_item.description}</div>
                {/* <button
                  className="text-primary mt-3 rounded px-2 ms- 2"
                  style={{ backgroundColor: "cyan" }}
                >
                  Follow
                </button> */}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
