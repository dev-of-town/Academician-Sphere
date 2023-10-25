"use client";
import React, { useRef, useState } from "react";
import styles from "../_styles/ImageUploader.module.css";
// import { ToastContainer, toast } from "react-toastify";

const ImageUploader = ({imageData,fieldName}) => {
  const [image, setImage] = useState(null);
  const ref = useRef();

  const handleChange = ({ target: { files } }) => {
    if (files) {
      if(image){
        imageData.append(fieldName,files[0]);
      }else{
        imageData.append(fieldName,files[0]);
      }
      setImage(URL.createObjectURL(files[0]));
      console.log(files[0],"--",imageData);
    }
  };
  
  return (
    <div className={styles.container}>
      <form
        action=""
        onClick={() => {
          ref.current.click();
        }}
        className={styles.form}
      >
        <input
          ref={ref}
          type="file"
          accept="image/*"
          className={styles.imginput}
          hidden
          onChange={handleChange}

        />
        {image && <img src={image} className={styles.uploaded} />}
        <div className={styles["upload-img"]}>
          <img src={"/upload.png"} className={styles.upload} />
          Click to Upload Image
        </div>
      </form>
    </div>
  );
};

export default ImageUploader;
