"use client";
import React, { useState } from "react";
import styles from "../styles/navbar.module.css";
import Image from "next/image";
// import logo from "@/public/.svg";
import Link from "next/link";


const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const searchHappen = (e)=>{
    setSearchQuery(e.target.value);
    console.log(searchQuery);
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* <div className={styles.hamburger}>
          <button>

          </button>
        </div> */}

        <div className={styles.logo}>
            <Link href={"/"}>
                <Image src="/Academia.svg" alt="acad" width={100} height={30} priority />
            </Link>
        </div>
        {/* <div className={styles.links}>
            <Link href={"/"}>Explore</Link>
            <Link href={"/"}>Quiz and Practice</Link>
        </div> */}
        
        <div className={styles.searchBar}>
            <div>
                <input type="text" placeholder="Search Acedemia" onChange={searchHappen}/>
                <button><Image src={"/searchicon.svg"} alt="search" width={26} height={26} priority/></button>
            </div>
        </div>
        <div className={styles.login}>
          <button> Login </button>
        </div>

        <div className={styles.profile}>
            <div>
                <Link href={"/profile"}>
                    <Image src={"/favicon.ico"} alt="acad" width={34} height={34} priority/>
                </Link>
            </div>
        </div>
        
      </nav>
    </header>
  );
};

export default Navbar;
