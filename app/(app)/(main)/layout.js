import MenuProvider from "@/app/_contexts/MenuContext";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import styles from "./_styles/center.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";


async function getUser() {
  return { user: "Karm" };
}

export default async function RootLayout({ children }) {
  return (
    <>
      {/* <html lang="en">
      <body
        className={inter.className}
        suppressHydrationWarning
        suppressContentEditableWarning
        >
        <UserProvider> */}
      <MenuProvider>
        <Navbar/>
        <div className={styles.center}>
          <Sidebar />
          <main className={styles.main}>{children}</main>
        </div>
      </MenuProvider>
      {/* </UserProvider>
      </body>
    </html> */}
    </>
  );
}
