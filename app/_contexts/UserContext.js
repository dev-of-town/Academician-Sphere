"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useContext, useState, useMemo } from "react";
// import { cookies } from 'next/headers'

export const UserContext = createContext({
  user: {},
  setUser: () => {},
});



let i = 0;

export default function UserProvider({ children }) {
  let user = null;
  const setUser = (x) => {
    user = x;
  };
  // const router = useRouter();
  // user = useMemo(async () => {
  //   let data = await getUser();
  //   console.log(data, "In memo");
  //   return;
  // }, [user]);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
