"use client";
import React, { useRef, useState, useEffect } from "react";
import styles from "../_styles/SearchBar.module.css";
import Image from "next/image";

import ProfileCard from "./ProfileCard";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";



const SearchBar =  ({onlyUser = false, isFromCreateProject = false, newProject = null, setNewProject = null}) => {

  const [output,setOutput] = useState({
    communities: [],
    users: [],
  });
  const refOutput = useRef(null);
  const refBar = useRef(null);

  return (
    <div className={styles.searchBar} ref={refBar} onBlur={()=>{
        
    }}>
        <SearchInput setOutput={setOutput} onlyUser={onlyUser} refOutput={refOutput} />
        <SearchResult output={output} refOutput={refOutput} isFromCreateProject = {isFromCreateProject}
                newProject = {newProject}
                setNewProject = {setNewProject}/>
    </div>
  );
};

export default SearchBar;
