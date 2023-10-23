"use client"
import React, { useRef } from "react";
import styles from "../_styles/FeedFilters.module.css";

const FeedFilters = ({}) => {

  const handleClick = (e)=>{
      console.log(refSelect.current.value);
  }

  const refSelect = useRef(null);
  return (
    <div className={styles.container} style={{marginLeft:'auto'}}>
      <select className={styles.filter} ref={refSelect} onClick={handleClick}>
        <option value="all">All</option>
        <option value="news">News</option>
        <option value="event">Event</option>
        <option value="collaboration">Collaboration</option>
      </select>
    </div>
  );
};

export default FeedFilters;
