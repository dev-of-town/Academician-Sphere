"use client";
import React, { useState } from "react";
import styles from "../_styles/SearchBar.module.css";
import Image from "next/image";

const getUser = async (query) => {
  // let users = null;
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  return data.json();
};

const SearchBar = ({ forUser, forCommunity, forBoth }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [output, setOutput] = useState([]);
  const searchHappen = async (e) => {
    setSearchQuery(e.target.value);
    console.log(searchQuery);
    setOutput(await getUser(searchQuery));
    console.log(output);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchinput}>
        <input
          type="text"
          placeholder="Search Acedemia"
          onChange={searchHappen}
        />
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
      {searchQuery && (
        <div className={styles.searchoutput}>
          {output.map((item) => {
            return <div className={styles.outputitem}>{item.name}</div>;
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
