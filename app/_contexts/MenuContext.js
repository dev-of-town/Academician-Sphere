"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useContext, useState, useRef } from "react";
// import { cookies } from 'next/headers'

export const MenuContext = createContext({
  isSideMenuOpen: true,
  setIsSideMenuOpen: () => {},
  refSideMenu : null,
  refCommunityAbout : null
});

let i = 0;

export default function MenuProvider({ children }) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
  const refSideMenu = useRef();
  const refCommunityAbout = useRef();
  return (
    <MenuContext.Provider value={{ isSideMenuOpen,setIsSideMenuOpen,refSideMenu,refCommunityAbout}}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
