import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import styles from "./CSS/Profile.module.css";
import Name_images from "./Components/Name_images";
import Education from "./Components/Education";
import Experience from "./Components/Experience";
import Skills from "./Components/Skills";
let profile_demo = {
    flag:1,
    username : "Rushabh Gandhi",
    profile_img : "/Res/rays.jpg",
   background_img : "/Res/rays.jpg",
   DOB : new Date("04/12/2004"),
   followers : 345,
   following : 89,
   institute: {name : "The Mahararaja sayajirao university of baroda", img:"/Res/rays.jpg"},
   links : [
    {name:"Leetcode",link:"https://leetcode.com/dhruvbhatt553/"},
    {name:"Naukri.com",link:"https://leetcode.com/dhruvbhatt553/"},
    {name:"Instagram",link:"https://leetcode.com/dhruvbhatt553/"},
    {name:"Github",link:"https://leetcode.com/dhruvbhatt553/"}
   ],
   Colleges: [{name : "GSFC", img:"/Res/rays.jpg",edu:"Bechlor of technology-BE,Chemical Engg..",yearRange:"2021-2025"},
   {name : "Phoniex school", img:"/Res/rays.jpg",edu:"12th",yearRange:"2019-2021"},
   {name : "GSFC", img:"/Res/rays.jpg",edu:"time pass",yearRange:"2018-2019"}],

   Companies: [{name : "Deepak nitrate", img:"/Res/rays.jpg",role:"Chemical Engg..",yearRange:"2034-present"},
   {name : "Tata Chemicals", img:"/Res/rays.jpg",role:"Chemical Engg",yearRange:"2029-2034"},
   {name : "siemens", img:"/Res/rays.jpg",role:"Chemical Engg..",yearRange:"2025-2029"}],

   Skills : [{name:"C",level:"Intermidiate",ins:"MSU"},
   {name:"C++",level:"Intermidiate",ins:"MSU"},
   {name:"JAVA",level:"Intermidiate",ins:"MSU"},
   {name:"DSA",level:"Intermidiate",ins:"MSU"}]



}
export default function Main() {
    return (
       <body className={styles.Profile_body}> 
        <div className={styles.ch_dip} style={{ margin: "10px auto" }}>
  <div >
   <Name_images {...profile_demo} />
    <div className={`border ${styles.tabs} pt-3 ps-3`} >
      <div className="fw-bold fs-5">Education</div>
      <Education Colleges={profile_demo.Colleges}/>
    </div>
    <div className={`border ${styles.tabs} pt-3 ps-3`} >
      <div className="fw-bold fs-5">Experience</div>
     <Experience Companies={profile_demo.Companies}/>
    </div>
    <div className={`border ${styles.tabs} pt-3 ps-3`}>
      <div className="fw-bold fs-5">Skills</div>
      <Skills Skills={profile_demo.Skills}/>
    </div>
  </div>
  <div className={`border ${styles.posts} rounded-bottom-0`}>
    <div
      className="fw-bold fs-5 d-block text-center p-1"
      style={{ borderBottom: "1px solid black" }}
    >
      Messaging
    </div>
    <div style={{ overflowY: "scroll", height: "400px", paddingBottom: "10px" }}>
      <div className={styles.msg_cont}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
        voluptatibus perspiciatis, quo enim vel sit quisquam asperiores natus
        praesentium tempore. Provident quod quo beatae dolorum eaque minus
        laborum. Suscipit reprehenderit laudantium fugiat sint neque.
      </div>
      <div className={styles.msg_cont}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
        voluptatibus perspiciatis, quo enim vel sit quisquam asperiores natus
        praesentium tempore. Provident quod quo beatae dolorum eaque minus
        laborum. Suscipit reprehenderit laudantium fugiat sint neque.
      </div>
      <div className={styles.msg_cont}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
        voluptatibus perspiciatis, quo enim vel sit quisquam asperiores natus
        praesentium tempore. Provident quod quo beatae dolorum eaque minus
        laborum. Suscipit reprehenderit laudantium fugiat sint neque.
      </div>
    </div>
    <div
      className="w-100 d-flex fixed-bottom"
      style={{ marginTop: "5px", position: "relative" }}
    >
      <textarea
        placeholder="Enter Text..."
        className="mx-2 w-75"
        style={{ overflowY: "hidden" }}
        rows={2}
        defaultValue={""}
      />
      <a
        className="fa-regular fa-paper-plane m-2"
        style={{ fontSize: "xx-large" }}
        id="send_msg"
      ></a>
    </div>
  </div>
</div>
</body>
      


    )
}