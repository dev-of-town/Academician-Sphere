"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "../_styles/SearchBar.module.css";
import Image from "next/image";

import ProfileCard from "./ProfileCard";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";



const SearchBar =  () => {

  const [output,setOutput] = useState({
    communities: [],
    users: [],
  });
  const refOutput = useRef(null);
  const refBar = useRef(null);

  return (
    <div className={styles.searchBar} ref={refBar} onBlur={()=>{
        
    }}>
        <SearchInput setOutput={setOutput} refOutput={refOutput} />
        <SearchResult output={output} refOutput={refOutput}/>
    </div>
  );
};

export default SearchBar;
