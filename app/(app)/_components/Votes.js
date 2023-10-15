import React from "react";
import styles from "../styles/Votes.module.css"
import Image from "next/image";

const Votes = ({ votes }) => {
  return (
    <div className={styles.container}>
      <button className={styles.upvote}>
        <Image src={"/upvote.svg"} width={25} height={30}/>
      </button>
      {votes}
      <button className={styles.downvote}>
        <Image src={"/upvote.svg"} style={{transform:"rotate(180deg)",fill:"orange"}} width={25} height={30}/>
      </button>
    </div>
  );
};

export default Votes;
