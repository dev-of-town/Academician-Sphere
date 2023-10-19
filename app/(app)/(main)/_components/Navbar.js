"use client";
import React, { useContext, useState } from "react";
import styles from "../_styles/Navbar.module.css";
import Image from "next/image";
// import logo from "@/public/.svg";
import Link from "next/link";
import Dropdown from "./Dropdown";
import SearchBar from "./SearchBar";
import { UserContext } from "@/app/_contexts/UserContext";
import HamBurgerBtn from "./HamBurgerBtn";

const Navbar = () => {
  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          {/* <div className={styles.hamburger}>
          <button>

          </button>
        </div> */}

          <div className={styles.contleft}>
            <div className={styles.hamburger}>
              <HamBurgerBtn />
            </div>
            <div className={styles.logo}>
              <Link href={"/"}>
                <Image
                  src="/Academia.svg"
                  alt="acad"
                  width={100}
                  height={30}
                  priority
                />
              </Link>
            </div>
          </div>
          {/* <div className={styles.links}>
            <Link href={"/"}>Explore</Link>
            <Link href={"/"}>Quiz and Practice</Link>
        </div> */}

          <div className={styles.searchBar}>
            <SearchBar />
          </div>
          <div className={styles.login}>
            <button> Login </button>
          </div>

          <div className={styles.profile}>
            <div>
              <Link href={"/About"}>
                <Image
                  src={"/favicon.ico"}
                  alt="acad"
                  width={34}
                  height={34}
                  priority
                />
              </Link>
            </div>
            <div className={styles.menu}>
              <Dropdown>
                <button onClick={()=>{console.log("Hey I am Clicked");}}>Log Out</button>
              </Dropdown>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
