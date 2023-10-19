import { useMenu } from "@/app/_contexts/MenuContext";
import Image from "next/image";
import React from "react";
import styles from "../_styles/HamBurger.module.css";

const HamBurgerBtn = () => {
  const { setIsSideMenuOpen, isSideMenuOpen, refSideMenu } = useMenu();
  const toggleSideMenu = () => {
    //     console.log(refSideMenu);
        let list = refSideMenu.current.classList;
        
        if(list.contains('translate-x-full')){
            list.remove('translate-x-full');
            list.add('translate-x-0');
        }else{
            list.remove('translate-x-0');
            list.add('translate-x-full');
        }

  };

  return (
    <button className={styles.hamburger} onClick={toggleSideMenu}>
      <Image src={"/menu-icon.svg"} width={35} height={35} />
    </button>
  );
};

export default HamBurgerBtn;
