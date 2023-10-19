"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useContext, useState } from "react";
// import { cookies } from 'next/headers'

export const UserContext = createContext({
  user: {},
  setUser: () => {},
});

let i = 0;

export default function UserProvider({ children }) {
  const [user, setUser] = useState({});
//   const router = useRouter();
//   console.log(i++,router);
//   useEffect(() => {
//     try {
//       // if(user.username){

//       // }
//       fetch("/api/getuser")
//         .then((response) => {})
//         .catch((error) => {});
//     } catch (error) {}
//   }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
