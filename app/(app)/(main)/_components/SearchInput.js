"use client";
import React, { useRef, useState, useMemo, useEffect } from "react";
import styles from "../_styles/SearchBar.module.css";
import Image from "next/image";

import ProfileCard from "./ProfileCard";

const getUser = async (query) => {
  if (query === "") {
    return {
      communities: [],
      users: [],
    };
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

const SearchInput = ({ setOutput, refOutput }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchHappen = async (e) => {
    const query = e.target.value;
    if (query.length === 0) {
      refOutput.current.classList.add("h-0");
      refOutput.current.classList.remove("border-1");
    } else {
      refOutput.current.classList.remove("h-0");
      refOutput.current.classList.add("border-1");
    }
    setSearchQuery(query);
    getUser(query)
      .then((res) => {
        console.log(res, "Data-------");
        setOutput(res);
      })
      .catch((error) => {
        console.log(error);
      });
    console.log(query);
  };

  const handleFocus = (e) => {
    e.preventDefault();
    if (searchQuery.length !== 0) {
      refOutput.current.classList.remove("h-0");
      refOutput.current.classList.add("border-1");
    }
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
            refOutput.current.classList.remove("border-1");
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
