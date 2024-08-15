// import React, { useEffect,useState } from 'react'
import axios from 'axios';
import Feed from '../../../_components/Feed'

async function getSeeData(id) {
  try {
    console.log("In GET SEE DATA", id);
    const res = await fetch(`http://localhost:4041/u/${id}/get-user-posts`,{
      cache: 'no-store'
    });

    const data = await res.json();
    console.log(data,"-------------------------------");
    return {...data};

    return {};

    // headers:{
    //   'Content-Type': 'application/json',
    // }
    //  });
    // console.log(res.data.data, "MY RES");
    // if (res.data.success) return res.data.data;
    // return null;
  } catch (error) {
    console.log(error, "OOPS ERROR");
    return {};
  }
}

const page = async ({ params: { username } }) => {

  
  

  // const [reqarray, chreqarray] = useState([]);


  // useEffect(() => {



  //   fetch(`http://localhost:4041/u/${username}/get-user-posts`).then(async (res) => {
  //     data = await res.json();
  //     console.log(data);
  //     chreqarray(data);
  //     // let coms = data.followingCommunity.map((c)=>{
  //     //   c.selected = false;
  //     //   return c;
  //     // })
  //     // // console.log(coms);
  //     // usercoms.coms = coms;
  //     // console.log(usercoms,"Hello");
  //     // changeCon(coms);
  //   }).catch((error) => {
  //     console.log(error);
  //   });


  // }, []);
  let data = await getSeeData(username);

  console.log(0, username,data,data.posts,"My posts");

  return (
    <div id='save-post' style={{
      display:"flex",
      justifyContent:"center",
      paddingTop:"50px",
    }}>
      <Feed posts={ data.posts } width={"50%"} />
    </div>
  )
}




export default page