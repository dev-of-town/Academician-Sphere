import Image from "next/image";
import Link from "next/link";
import React from "react";
// import CommunityCard from './CommunityCard';

const TopCommunities = async () => {
  let res = await fetch("http://localhost:4041/get-top-communities-5");
  const { communities } = await res.json();
  console.log("-------------------------------------------");
  console.log(communities);

  return (
    <div
      style={{
        position: "fixed",
        top: "60px",
        right: 0,
        width: "350px",
        border: "1PX SOLID BLACK",
        padding: "1REM",
        borderRadius: "1rem",
      }}
    >
      <h3 style={{ fontSize: "20px" }}>Top Communities :</h3>
      {communities?.map((community) => {
        return (
          <div style={{display:"flex",margin:"15px", gap:"5px"}}>
            <div>
              <Image
                src={community?.profile_img.url}
                width={25}
                height={25}
                alt="+"
              />{" "}
            </div>
            <div>
              <Link href={community.community_id}>c/{community?.community_id}</Link>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopCommunities;
