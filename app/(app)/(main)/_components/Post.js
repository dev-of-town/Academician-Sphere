"use client"
import React from "react";
import styles from "../_styles/Post.module.css";
import ProfileCard from "./ProfileCard";
import Image from "next/image";
import Votes from "./Votes";
import Link from "next/link";
import CommentShow from "./CommentShow";
import Bookmark from "./Bookmark";
import Dropdown from "./Dropdown";

const Post = ({data}) => {
  
  return (

    <>
    <div href={'/'} className={styles.post} >  
      <div className={styles.header}>
        <div className={styles.profilecard}>
          <ProfileCard
            community={data.community}
            profileimage={data.profileimage}
          />
          <div className={styles.timeago}>~ 3 hours ago</div>
        </div>
        <div className={styles.category}>{data.category}</div>
        <div className={styles.menudots}>
          <Dropdown content={<button>Report</button>}/>
        </div>
      </div>
      <div className={styles.subject}>{data.subject}</div>
      {!data["text"] || <div className={styles.text}>{data.text}</div>}
      {!data["img"] || (
        <div className="contentimg">
          <Image
            src={data.img}
            width={700}
            height={475}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
              borderRadius:"1rem"
            }}
            priority
          />
        </div>
      )}
      <div className={styles.footer}>
            <div className={styles.votes}> 
                <Votes votes={data.votes}/>
            </div>
            <div className={styles.comment}>
                <CommentShow comments={100}/>
            </div>
            <div>
                <Bookmark />
            </div>
      </div>
    </div>
    </>
  );
};

export default Post;
