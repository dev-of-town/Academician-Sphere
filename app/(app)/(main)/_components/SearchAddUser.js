"use client";
import React, { useRef, useState } from "react";
import styles from "../_styles/SearchBar.module.css";
import specs from '../_styles/SearchAddUser.module.css'
import Image from "next/image";
import SearchAddUserResult from "./SearchAddUserResult";
import { output } from "@/next.config";


const getUser = async (query) => {
  if (query === ""){
    return [];
  }
  // let users = null;
  const res = await fetch(`http://localhost:4041/u/search?q=${query}`, {
    method: "GET",
    mode: "cors",
  });
  const data = await res.json();
  console.log(data,"-----------123456");
  if (data.success) return data.data;
  return [];
};

const SearchAddUserInput = ({ maxHeight, top, ref, refOutput,setOutput,placeholder }) => {
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

  const handleFocus = (e)=>{
    e.preventDefault();
    refOutput.current.classList.remove("h-0");
  }
  
  const handleOutFocus = (e)=>{
    e.preventDefault();
  }

  return (
    
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
          type="text"
          placeholder={placeholder}
          onChange={searchHappen}
          onFocus={handleFocus}
          onBlur={handleOutFocus}
        />
        <button onClick={()=>{
            setSearchQuery("");
            refOutput.current.classList.add("h-0");
        }}>x</button>
      </div>
      
  );
};

export default SearchAddUserInput;