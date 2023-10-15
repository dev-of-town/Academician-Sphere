"use client ";
import Image from "next/image";
import React, { useState } from "react";

import styles from '../styles/Dropdown.module.css'; // Import your CSS file

const Dropdown = ({content}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.container}>
      <button className={styles.btn} onClick={toggleDropdown}>
        <Image src={"/3dots.svg"} alt={"click"} width={15} height={20} />
      </button>
      {/* <div className={styles.dropdown}> */}
        {isOpen && (
          <div className={styles["dropdown-content"]}>
            {content}
          </div>
        )}
      {/* </div> */}
    </div>
  );
};

export default Dropdown;
