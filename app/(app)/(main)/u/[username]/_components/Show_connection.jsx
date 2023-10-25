"use client";
import styles from "../_css/Profile.module.css";

import { useState, useEffect } from "react";

const getData = async (id) => {
  try {
    console.log("In get method");
    const res = await (await axios.get(`/api/getuser/${id}`)).json();
    console.log(res, res.user, 123);
    if (res.success) {
      return res.user;
    }
    return null;
  } catch (error) {
    // setIsError(error.message);
    console.error("this is error !!!", error.message);
    return null;
  }
};

export default function Show_connection({ list }) {
  const userlist = [];



  useEffect(() => {
    // console.log("hello ", window.location.href);
    //  getData()
    list.map((lid) =>
      getData(lid.id)
        .then((res) => {
          console.log(res, "In getData dhruv");
          if (res !== null) {
            userlist.push({
              username: res.data.username,
              about: res.data.about,
              profile_img: res.data.profile_img,
            });
          }

          // console.log(profile_demo,"Profile demo");
        })
        .catch((error) => {
          console.log(error);
        })
    );
  }, []);

  console.log(list,"----------00--------------");

  return (
    <div className="p-3" style={{ maxHeight: "500px", overflowY: "scroll" }}>
      {userlist.length > 0 &&
        userlist.map((list_item) => (
          <div>
            <div className={`d-flex  ${styles.list}`}>
              <img
                src={list_item.profile_img.url}
                className={styles.list_img}
              />
              <div>
                <div className={styles.connection_username}>
                  {list_item.username}
                </div>
                <div className={styles.remarks}>{list_item.about}</div>
                <button
                  className="text-primary mt-3 rounded px-2 ms-2"
                  style={{ backgroundColor: "cyan" }}
                >
                  Follow
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
