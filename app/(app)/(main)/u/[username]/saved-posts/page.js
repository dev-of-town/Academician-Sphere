// import React, { useEffect,useState } from 'react'
import axios from 'axios';
import Feed from '../../../_components/Feed'

async function getSeeData(id) {
  try {
    console.log("In GET SEE DATA", id);
    const res = await axios.get(`http://localhost:4041/u/${id}/get-saved-posts`,
      {
        headers: {
          //   "Content-Type": "application/json",
          'Content-Type': 'application/x-www-form-urlencoded',
        }
      }
    );


      console.log(res,"My response inubfedsjbhffjdvskbfhvgyuhjS");
    data = await res.json();
    console.log(data);
   
    if(data.sucess) return data.posts;
    return [];

    // headers:{
    //   'Content-Type': 'application/json',
    // }
    //  });
    // console.log(res.data.data, "MY RES");
    // if (res.data.success) return res.data.data;
    // return null;
  } catch (error) {
    console.log(error, "OOPS ERROR");
    return null;
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
  const posts = await getSeeData(username);

  console.log(0, username);
  return (
    <div style={{display:'flex',maxWidth:'300px'}}>
      <Feed posts={ posts } />
    </div>
  )
}




export default page