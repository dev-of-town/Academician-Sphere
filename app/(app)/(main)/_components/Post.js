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

const Post = ({post}) => {
  console.log(post,"THIs is iPOSt");
  return (

    <>
    <div href={'/'} className={styles.post} >  
      <div className={styles.header}>
        <div className={styles.profilecard}>
          <ProfileCard
            name={post.sender_name?post.sender_name:"Karm"}
            id={post.sender_id}
            profileimage={(post.sender_profile?post.sender_profile.url:'/next.svg')}
          />
          <div className={styles.timeago}>~ 3 hours ago</div>
        </div>
        <div className={styles.category}>{post.category}</div>
        <div className={styles.menudots}>
          <Dropdown content={<button>Report</button>}/>
        </div>
      </div>
      <div className={styles.subject}>{post.title}</div>
      {!post["body"] || <div className={styles.text}>{post.body}</div>}
      {post.attachment.length!==0 && (
        <div className="contentimg">
          <Image
            src={post.attachment[0]?post.attachment[0].url:"/next.svg"}
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
                <Votes votes={post.votes}/>
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
