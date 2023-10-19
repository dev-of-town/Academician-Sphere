import UserProvider from "../../_contexts/UserContext";
import styles from "./_css/layout.module.css";
import "./authglobals.css";

export const metadata = {
  title: "Academician Sphere",
  description: "Community Based Social Media Network",
};

export default function RootLayout({ children }) {
  return (
    <>
      {/* <html lang="en">
      <body suppressHydrationWarning suppressContentEditableWarning> */}
      <div className={"body"}>
        <div className={styles.main}>{children}</div>
        <div className={styles.right}></div>
      </div>
      {/* </body>
    </html> */}
    </>
  );
}
