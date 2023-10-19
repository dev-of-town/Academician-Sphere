"use client";
import React, { useState } from "react";
import styles from "../_styles/SearchBar.module.css";
import specs from '../_styles/SearchAddUser.module.css'
import Image from "next/image";

const getUser = async (query) => {
  // let users = null;
  const data = await fetch("https://jsonplaceholder.typicode.com/users");
  return data.json();
};

const SearchAddUser = ({ forUser, forCommunity, forBoth, maxHeight, top, ref, placeholder }) => {
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
        <button>
          <Image
            src={"/searchicon.svg"}
            alt="search"
            width={26}
            height={26}
            priority
          />
        </button>
        <input
        ref={ref}
          type="text"
          placeholder={placeholder}
          onChange={searchHappen}
        />
      </div>
      {searchQuery && (
        <div className={`${styles.searchoutput} ${specs.searchoutput}`} style={{maxHeight,top}}>
          {output.map((item) => {
            return (
              <div className={styles.outputitem}>
                {item.name}

                <button onClick={() => {}} className={specs.add}>Add</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchAddUser;
