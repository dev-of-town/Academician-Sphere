import React, { useState } from "react";
import styles from "../_styles/Votes.module.css";
import Image from "next/image";

const Votes = ({ votes, postid, isUpvoted, isDownVoted }) => {
  const [upvoted, setUpvoted] = useState(isUpvoted);
  const [downvoted, setDownvoted] = useState(isDownVoted);
  const [countVotes, setCountVotes] = useState(votes);

  const upVote=()=>{
    if(downvoted){
      downVote();
    }
    setUpvoted((prev)=>!prev);
    setCountVotes((prev) => (upvoted?prev-1:prev+1));
  }

  const downVote=()=>{
    if(upvoted){
      upVote();
    }
    setDownvoted((prev)=>!prev);
    setCountVotes((prev) => (downvoted?prev+1:prev-1));
  }

  const handleUpvote = async () => {
    upVote();
    try {
      // const response = await fetch(``, {
      //   method: "POST", // *GET, POST, PUT, DELETE, etc.
      //   mode: "cors", // no-cors, *cors, same-origin
      //   headers: {
      //     //   "Content-Type": "application/json",
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   body: JSON.stringify(profileid), // body data type must match "Content-Type" header
      // });
      // const { success } = await response.json();
      // if (!success) {
      //   countVotes((prev) => prev - 1);
      //   setUpvoted(!upvoted);
      // }
    } catch (error) {
      console.log(error);
      setCountVotes((prev) => prev - 1);
      setUpvoted(!upvoted);
    }
  };

  const handleDownvote = async () => {
    downVote();
    try {
      // const response = await fetch(``, {
      //   method: "POST", // *GET, POST, PUT, DELETE, etc.
      //   mode: "cors", // no-cors, *cors, same-origin
      //   headers: {
      //     //   "Content-Type": "application/json",
      //     "Content-Type": "application/x-www-form-urlencoded",
      //   },
      //   body: JSON.stringify(profileid), // body data type must match "Content-Type" header
      // });
      // const { success } = await response.json();
      // if (!success) {
      //   countVotes((prev) => prev - 1);
      //   setDownvoted(!Downvoted);
      // }
    } catch (error) {
      console.log(error);
      setCountVotes((prev) => prev + 1);
      setDownvoted(!downvoted);
    }
  };
  return (
    <div className={styles.container}>
      <button className={styles.upvote} onClick={handleUpvote}>
        <svg
          rpl=""
          fill={upvoted?'orange':'black'}
          height="30"
          icon-name="upvote-outline"
          viewBox="0 0 18 18"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path d="M12.877 19H7.123A1.125 1.125 0 0 1 6 17.877V11H2.126a1.114 1.114 0 0 1-1.007-.7 1.249 1.249 0 0 1 .171-1.343L9.166.368a1.128 1.128 0 0 1 1.668.004l7.872 8.581a1.25 1.25 0 0 1 .176 1.348 1.113 1.113 0 0 1-1.005.7H14v6.877A1.125 1.125 0 0 1 12.877 19ZM7.25 17.75h5.5v-8h4.934L10 1.31 2.258 9.75H7.25v8ZM2.227 9.784l-.012.016c.01-.006.014-.01.012-.016Z"></path>
        </svg>
      </button>
      {countVotes}
      <button className={styles.downvote} onClick={handleDownvote}>
        <svg
          rpl=""
          height="30"
          fill={downvoted?'blue':'black'}
          icon-name="downvote-outline"
          viewBox="0 0 18 18"
          width="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          {" "}
          <path d="M10 20a1.122 1.122 0 0 1-.834-.372l-7.872-8.581A1.251 1.251 0 0 1 1.118 9.7 1.114 1.114 0 0 1 2.123 9H6V2.123A1.125 1.125 0 0 1 7.123 1h5.754A1.125 1.125 0 0 1 14 2.123V9h3.874a1.114 1.114 0 0 1 1.007.7 1.25 1.25 0 0 1-.171 1.345l-7.876 8.589A1.128 1.128 0 0 1 10 20Zm-7.684-9.75L10 18.69l7.741-8.44H12.75v-8h-5.5v8H2.316Zm15.469-.05c-.01 0-.014.007-.012.013l.012-.013Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default Votes;
