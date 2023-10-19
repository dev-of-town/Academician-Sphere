import React from "react";
import styles from "../_styles/CreateCommunityBtn.module.css";
import Link from "next/link";

const CreateCommunityBtn = () => {
  return (
    <div className={`${styles.btn}`}>
      <Link href={"/create-community"}>Create Community</Link>
    </div>
  );
};

export default CreateCommunityBtn;
