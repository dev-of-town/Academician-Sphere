"use client";

import { useRouter } from "next/navigation";
import { createContext, useEffect, useContext, useState } from "react";
// import { cookies } from 'next/headers'

export const SearchContext = createContext({});

let i = 0;

export default function SearchContextProvider({ children }) {
  const [query, setQuery] = useState('');
  const [result,setResult] = useState([]);

  return (
    <SearchContext.Provider value={{ query, setQuery,result,setResult }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useUser() {
  return useContext(SearchContext);
}
