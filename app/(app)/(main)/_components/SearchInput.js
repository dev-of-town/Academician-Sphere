"use client";
import React, { useRef, useState, useMemo, useEffect } from "react";
import styles from "../_styles/SearchBar.module.css";
import Image from "next/image";

import ProfileCard from "./ProfileCard";

const getUser = async (query) => {
  if (query === ""){
    return ({
      communities: [],
      users: [],
    });
  }
  // let users = null;
  const res = await fetch(`http://localhost:4041/search?q=${query}`, {
    method: "GET",
    mode: "cors",
  });
  const data = await res.json();
  if (data.success) return data.data;
  return {
    communities: [],
    users: [],
  };
};

const SearchInput =  ({ setOutput,refOutput }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchHappen = async (e) => {
    setSearchQuery(e.target.value);
    if(searchQuery.length===0) refOutput.current.classList.add("h-0");
    getUser(searchQuery).then((res)=>{
      console.log(res,"Data-------");
      setOutput(res);
    }).catch((error)=>{
      console.log(error);
    })
    console.log(searchQuery);
  };

  const handleFocus = (e) => {
    e.preventDefault();
    refOutput.current.classList.remove("h-0");
  };


  return (
    <>
      <div className={styles.searchinput}>
        <input
          type="text"
          placeholder="Search Acedemia"
          onChange={searchHappen}
          onFocus={handleFocus}
          value={searchQuery}
        />
        <button
          onClick={() => {
            setSearchQuery("");
            refOutput.current.classList.add("h-0");
          }}
        >
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
    </>
  );
};

export default SearchInput;
