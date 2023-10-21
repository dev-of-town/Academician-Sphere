import Image from "next/image";
import React from "react";

const TemplateImageCommunity = ({ url }) => {
  return (
    <>
      <Image
        src={url}
        width={700}
        height={475}
        sizes="100vw"
        style={{
          width: "100%",
          height: "200px",
        }}
        
      />
    </>
  );
};

export default TemplateImageCommunity;
