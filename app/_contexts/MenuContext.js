"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useContext, useState, useRef } from "react";
// import { cookies } from 'next/headers'

export const MenuContext = createContext({
  isSideMenuOpen: false,
  setIsSideMenuOpen: () => {},
  refSideMenu : null,
  refCommunityAbout : null,
  refSearchFull : null
});

let i = 0;

export default function MenuProvider({ children }) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const refSideMenu = useRef();
  const refCommunityAbout = useRef();
  const refSearchFull = useRef();
  return (
    <MenuContext.Provider value={{ isSideMenuOpen,setIsSideMenuOpen,refSideMenu,refCommunityAbout,refSearchFull}}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
