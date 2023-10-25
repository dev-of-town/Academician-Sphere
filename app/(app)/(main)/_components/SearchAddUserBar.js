"use client";

import React, { useRef, useState } from "react";
import styles from "../_styles/SearchBar.module.css";
import specs from "../_styles/SearchAddUser.module.css";
import Image from "next/image";
import SearchAddUserResult from "./SearchAddUserResult";
import SearchAddUserInput from "./SearchAddUser";

const SearchAddUserBar = ({ placeholder, moderators,setModerators, community }) => {
  const [output, setOutput] = useState([]);
  const refOutput = useRef(null);

  return (
    <div className={styles.searchBar}>
      <SearchAddUserInput placeholder={placeholder} refOutput={refOutput} setOutput={setOutput} />
      <SearchAddUserResult output={output} refOutput={refOutput} moderators={moderators} setModerators={setModerators} community={community}/>
    </div>
  );
};

export default SearchAddUserBar;
