"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useContext, useState, useRef } from "react";
// import { cookies } from 'next/headers'

export const MenuContext = createContext({
  isSideMenuOpen: true,
  setIsSideMenuOpen: () => {},
  refSideMenu : null
});

let i = 0;

export default function MenuProvider({ children }) {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(true);
  const refSideMenu = useRef();
  return (
    <MenuContext.Provider value={{ isSideMenuOpen,setIsSideMenuOpen,refSideMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
