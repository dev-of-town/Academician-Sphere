import { Inter } from "next/font/google";
import UserProvider from "../_contexts/UserContext";
import "../globals.css";

// import { createContext } from 'react'

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Academician Sphere",
//   description: "Community Based Social Media Network",
// };

// import { createContext } from 'react'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Academician Sphere",
  description: "Community Based Social Media Network",
};



export default function RootLayout({ children }) {


  return (
    <>
      <html lang="en">
        <body className={inter.className}>
          {/* <AuthenticationProvider> */}
          {children}
          {/* </AuthenticationProvider> */}
        </body>
      </html>
    </>
  );
}
