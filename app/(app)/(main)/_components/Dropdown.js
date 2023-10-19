"use client ";
import Image from "next/image";
import React, { useRef, useState } from "react";

import styles from "../_styles/Dropdown.module.css"; // Import your CSS file

const Dropdown = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const refSub = useRef(null);

  const toggleDropdown = () => {
    let list = refSub.current.classList;
    if (list.contains("dis-none")) {
      list.remove("dis-none");
    } else {
      list.add("dis-none");
    }
    // setIsOpen(!isOpen);
  };

  return (
    <></>
    // <div className={styles["dropdown"]}>
    //   <button className={styles["dropdown-btn"]} onClick={toggleDropdown}>
    //     <Image src={"/3dots.svg"} alt={"click"} width={15} height={20} />
    //   </button>
    //   <div className={styles["dropdown-content"]}>
    //     {children}
    //   </div>
    // </div>
  );
};

export default Dropdown;
