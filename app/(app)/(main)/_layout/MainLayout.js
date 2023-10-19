import React from "react";

const MainLayout = ({children}) => {
  return (
    <div>
      <Navbar />
      <div className={styles.center}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
