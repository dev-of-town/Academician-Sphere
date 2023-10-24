import { useUser } from "@/app/_contexts/UserContext";
import { getId } from "@/app/assets/Authorisation";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

async function getUser() {
    const response = await fetch("/api/getuser");
    const data = await response.json();
    if (data.success) {
      return data.user;
    }
    return null;
}

const NavProfile = (props) => {
   const [user,setUser] = useState(null);

    useEffect(()=>{
        getUser().then((res)=>{
            setUser(res);
            console.log("----------------------",res,"I am Nav Profile");
        }).catch((error)=>{
            setUser(null);
        });
    },[])

  return (
    <div style={{width:"40px",height:"40px",borderRadius:"50%",overflow:"hidden"}}>
      <Link href={user?`/u/${user._id}`:"/"}>
        <img
          src={user?`${user.profile_img.url}`:"/favicon.svg"}
          alt="acad"
          width={34}
          height={34}
          style={{backgroundColor:"white"}}
        />
      </Link>
    </div>
  );
};




export default NavProfile;
