import MenuProvider from "@/app/_contexts/MenuContext";
import Navbar from "./_components/Navbar";
import Sidebar from "./_components/Sidebar";
import styles from "./_styles/center.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProvider from "@/app/_contexts/UserContext";

// async function getUser() {
//   return { user: "Karm" };
// }

// async function getUser() {
//   fetch("/api/getuser")
//     .then(async (response) => {
//       const data = await response.json();
//       if(data.success){
//         return data.user;
//       }
//       return null;
//     })
//     .catch((error) => {
//       console.log(error, 1);
//       return null;
//     });

// }

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
      <UserProvider>
        <MenuProvider>
          <Navbar/>
          <div className={styles.center}>
            <Sidebar />
            <main className={styles.main}>{children}</main>
          </div>
        </MenuProvider>
      </UserProvider>
      {/* </UserProvider>
      </body>
    </html> */}
    </>
  );
}
