"use client";
import React, { useState } from "react";

import { Montserrat, Playfair_Display } from "@next/font/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPhotoFilm, faLink } from "@fortawesome/free-solid-svg-icons";
import styles from "./_css/createPost.module.css";
import PostReach from "./_components/PostReach";
import Comm_List from "./_components/Comm_List";
import Link_post from "./_components/Link_post";
import Dropzone from "./_components/Dropper";
const communities = [
  { name: "Cricket", nom: 5687 },
  { name: "Cricket1", nom: 567 },
  { name: "Cricket2", nom: 5967 },
];

export default function page() {
  // let [user_communities, getc] = useState([]);
  let [user_communities,chUser_comm] = useState({
    coms : []
  });
  let coms = [];
  const [crt_post, changeCon] = useState({
    community: [],
    // sender_id: params.user_id,
    isPublic: true,
    post_content: 1,
    date: new Date(),
    category: "Events",
    title: "",
    body: "",
    // attachment: [],
    // votes:[],
    // upvotes: [],
    // downvotes: [],
    // comments: [],
  });
  const formData = new FormData();
  console.log("catagory", crt_post.category);

  const sendit = async (e) => {
    //e.preventDefault();
    console.log("Sending It", user_communities.coms);
    // crt_post.communities = user_communities
    user_communities.coms.map((c) => {
      if (c.selected) {
        coms.push("" + c._id);
      }
    });
    if (coms.length == 0) {
      window.alert("Please select atleast 1 community");
    } else {
      // changeCon(...crt_post,community=coms);
      crt_post.community = coms;
      formData.append("json", JSON.stringify(crt_post));

      const response = await fetch("/api/new-post", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        body: formData, // body data type must match "Content-Type" header
      });

      console.log(await response.json());
    }
  };

  return (
    <div className={`px-5 py-2 ${styles.create_post}`}>
      <div className={styles.header}>
        <h5>Create a post</h5>
        <div className={`ms-auto ${styles.postCat}`}>
          <input
            id="public"
            onClick={() => changeCon({ ...crt_post, isPublic: true })}
            name="pub_pri"
            type="radio"
            defaultChecked={crt_post.isPublic == true}
          />
          <label htmlFor="public">Public&nbsp;&nbsp;&nbsp;</label>
          <input
            id="private"
            onClick={() => changeCon({ ...crt_post, isPublic: false })}
            name="pub_pri"
            type="radio"
            defaultChecked={crt_post.isPublic == false}
          />
          <label htmlFor="private">Private</label>
        </div>
        <div></div>
      </div>

      <div className={styles.line1}> </div>
      <div className={styles.dropContainer}>
        <div>
          {" "}
          <Comm_List usercoms={user_communities} crt_post={crt_post} chUser_comm={chUser_comm} />
        </div>
        <div>
          {" "}
          <PostReach crt_post={crt_post} changeCon={changeCon} />
        </div>
      </div>

      <div className="bg-white container rounded ">
        <div
          className={`d-flex mt-3 border-bottom ${styles.typeGp}`}
          style={{ marginLeft: "-10px", marginRight: "-10px" }}
        >
          <button
            className={`bg-white border-end py-2  ${
              (styles.typeTitle, crt_post.post_content === 1 && styles.current)
            }`}
            onClick={() => changeCon({ ...crt_post, post_content: 1 })}
          >
            <div
              href="#"
              className={
                crt_post.post_content === 1
                  ? styles.hovStyleon
                  : styles.hovStylen
              }
            >
              <span>
                <FontAwesomeIcon
                  icon={faPlus}
                  className="border-black border"
                />
                &nbsp; Post
              </span>
            </div>
          </button>
          <button
            className={`bg-white border-end py-2 ${
              (styles.typeTitle, crt_post.post_content === 2 && styles.current)
            }`}
            onClick={() => changeCon({ ...crt_post, post_content: 2 })}
          >
            <a
              href="#"
              className={
                crt_post.post_content === 2
                  ? styles.hovStyleon
                  : styles.hovStylen
              }
            >
              <span>
                <FontAwesomeIcon icon={faPhotoFilm} /> Image and video
              </span>
            </a>
          </button>
          {/* <button
            className={`bg-white py-2 ${
              (styles.typeTitle, crt_post.post_content === 3 && styles.current)
            }`}
            onClick={() => changeCon({ ...crt_post, post_content: 3 })}
          >
            <a
              href="#"
              className={
                crt_post.post_content === 3
                  ? styles.hovStyleon
                  : styles.hovStylen



                  
              }
            >
              <span>
                <FontAwesomeIcon icon={faLink} />
                &nbsp; Link
              </span>
            </a>
          </button> */}
        </div>

        <textarea
          placeholder="Title"
          className="m-3 border border-2 ps-3 "
          id="ta1"
          onChange={(event) =>
            changeCon({ ...crt_post, title: event.target.value })
          }
          value={crt_post.title}
          style={{
            width: "95%",
            borderRadius: "4px",
            overflowX: "hidden",
            overflowWrap: "break-word",
            height: "40px",
          }}
          maxLength="300"
          rows="1"
        ></textarea>
        <textarea
          id="ta2"
          onChange={(event) =>
            changeCon({ ...crt_post, body: event.target.value })
          }
          value={crt_post.des}
          placeholder="Text"
          className="m-3 border border-2 ps-3 "
          style={{ width: "95%", borderRadius: "4px" }}
          rows="5"
        ></textarea>
        {crt_post.post_content === 3 && (
          <Link_post crt_post={crt_post} changeCon={changeCon} />
        )}
        {crt_post.post_content === 2 && (
          <Dropzone
            formData={formData}
            crt_post={crt_post}
            changeCon={changeCon}
          />
        )}
      </div>
      <div>
        <button className="btn btn-primary float-end m-2" onClick={sendit}>
          Upload
        </button>
      </div>
    </div>
  );
}
