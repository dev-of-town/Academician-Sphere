"use client";
import React, { useRef, useState } from "react";
import styles from "../_styles/SearchBar.module.css";
import Image from "next/image";
import { useMenu } from "@/app/_contexts/MenuContext";

const getUser = async (query) => {
  // let users = null;
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  return data.json();
};

const SearchBar = ({ forUser, forCommunity, forBoth }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [output, setOutput] = useState([]);
  const refOutput = useRef(null);
  const searchHappen = async (e) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
    setOutput(await getUser(searchQuery));
    console.log(output);
  };
  const handleFocus = (e)=>{
    e.preventDefault();
    refOutput.current.classList.remove("h-0");
  }
  
  const handleOutFocus = (e)=>{
    e.preventDefault();
    refOutput.current.classList.add("h-0");
  }

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchinput}>
        <input
          type="text"
          placeholder="Search Acedemia"
          onChange={searchHappen}
          onFocus={handleFocus}
          onBlur={handleOutFocus}
          value={searchQuery}
        />
        <button onClick={()=>{setSearchQuery("");}}>
          x
        </button>
        <button>
          <Image
            src={"/searchicon.svg"}
            alt="search"
            width={26}
            height={26}
            priority
          />
        </button>
      </div>
      {
        <div className={styles.searchoutput} ref={refOutput}>
          {searchQuery && output.map((item) => {
            return <div className={styles.outputitem}>{item.name}</div>;
          })}
        </div>
      }
    </div>
  );
};

export default SearchBar;
