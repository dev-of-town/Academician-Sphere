"use client";

import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import styles from "./_css/Profile.module.css";
import Name_images from "./_components/Name_images";
import Education from "./_components/Education";
import Experience from "./_components/Experience";
import Skills from "./_components/Skills";
import Add_skill from "./_components/Add_skill";
import AddLink from "./_components/AddLink";
import Add_Exp from "./_components/Add_Exp";
import Add_Edu from "./_components/Add_Edu";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from './_components/axios.jsx'
import { headers } from "@/next.config";



export default function Main() {

  const [profile_demo, ch_profile_demo] = useState({

    flag: 2,
    username: "Rushabh Gandhi",
    profile_img: "/rays.jpg",
    background_img: "/rays.jpg",

    about: "I am very bad singer",
    followers: 345,
    following: 89,
    institute: { name: "The Maharaja sayajirao university of baroda", img: "/rays.jpg" },
    links: [
      { name: "Leetcode", link: "https://leetcode.com/dhruvbhatt553/" },
      { name: "Naukri.com", link: "https://leetcode.com/dhruvbhatt553/" },
      { name: "Instagram", link: "https://leetcode.com/dhruvbhatt553/" },
      { name: "Github", link: "https://leetcode.com/dhruvbhatt553/" }
    ],
    education: [{ name: "GSFC", img: "/rays.jpg", degree: "Bechlor of technology-BE", field: "Chemical Engg..", start: "2021", end: "2025" },
    { name: "Phoniex school", img: "/rays.jpg", degree: "12th", field: "Chemical Engg..", start: "2019", end: "2021" },
    { name: "GSFC", img: "/rays.jpg", degree: "time pass", field: "Chemical Engg..", start: "2018", end: "2019" }],

    experience: [{ company_name: "Deepak nitrate", img: "/rays.jpg", job_role: "Chemical Engg..", starting_year: "2012", ending_year: "2014" },
    { company_name: "Tata Chemicals", img: "/rays.jpg", job_role: "Chemical Engg", starting_year: "2016", ending_year: "2017" },
    { company_name: "siemens", img: "/rays.jpg", job_role: "Chemical Engg..", starting_year: "2020", ending_year: "2023" }],

    skills: [{ skill: "C", level: "Intermidiate", ins: "MSU" },
    { skill: "C++", level: "Intermidiate", ins: "MSU" },
    { skill: "JAVA", level: "Intermidiate", ins: "MSU" },
    { skill: "DSA", level: "Intermidiate", ins: "MSU" }]

  }
  )

  console.log("Printing ",profile_demo.education)
  const [error1, setIsError] = useState("")


  useEffect(() => {
    console.log("hello ")
   // getData()
  }, []);


  let ch_skill = (arr) => {
    ch_profile_demo({ ...profile_demo, education: arr })
    patchDemo();

  }
  let ch_gen = (newgen) => {
    ch_profile_demo(newgen)

    profile_demo.username = newgen.username;
    profile_demo.about = newgen.about;
    profile_demo.profile_img = newgen.profile_img;
    profile_demo.background_img = newgen.background_img;


    console.log("Pr : ")
    console.log(profile_demo)
    patchDemo()
  }




  let ch_exp = (arr) => {
    ch_profile_demo({ ...profile_demo, experience: arr })
    console.log("Pr : ")
    console.log(profile_demo);
    patchDemo();

  }
  let ch_edu = (arr) => {
    ch_profile_demo({ ...profile_demo, education: arr })
    console.log("Pr : ")
    console.log(profile_demo);
    patchDemo();
  }


  const getData = async () => {
    try {
      console.log("In get method");
      const res = await axios.get(`/u/6527cdb4752485a140ddd276`);
      console.log(res.data);
      ch_profile_demo(res.data);
    } catch (error) {
      setIsError(error.message);
      console.error("this is error !!!", error.message);

    }
  };


  const patchDemo = async () => {
    try {
      const res = await axios.patch("/edit-profile",
        profile_demo, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }
      ).then(function (response) {
        console.log("Response")
        console.log(response.data);
      }).catch(function (error) {
        console.log("From post", profile_demo)
        console.log(error);
      });



    } catch (error) {
      setIsError(error.message);
    }
  };



  const [as_flag, ch_as_flag] = useState(1);
  const [exp_flag, ch_exp_flag] = useState(1);
  const [edu_flag, ch_edu_flag] = useState(1);
  console.log("testing", profile_demo);

  return (
    <div className={ styles.Profile_body }>
      <div className={ styles.ch_dip } style={ { margin: "10px auto" } }>
        <div >
          <Name_images profile_demo_gen={ profile_demo } changer={ ch_gen } />
          <div className={ `border ${styles.tabs} pt-3 ps-3` } >
            <div className="d-flex justify-content-between">
              <div className="fw-bold fs-5">Education</div>
              <div className="me-4">
                <button className={ `btn border border-2 border-dark rounded ${styles.rem}` } onClick={ () => ch_edu_flag(2) }>
                  <FontAwesomeIcon icon={ faPlus } />
                </button>
              </div>
            </div>
            <Education c={profile_demo.education} changer={ ch_edu } />
          </div>
          <div className={ `border ${styles.tabs} pt-3 ps-3` } >
            <div className="d-flex justify-content-between">
              <div className="fw-bold fs-5">Experience</div>
              <div className="me-4">
                <button className={ `btn border border-2 border-dark rounded ${styles.rem}` } onClick={ () => ch_exp_flag(2) }>
                  <FontAwesomeIcon icon={ faPlus } />
                </button>
              </div>
            </div>            <Experience Companies={ profile_demo.experience } changer={ ch_exp } />
          </div>
          <div className={ `border ${styles.tabs} pt-3 ps-3 ` }>
            <div className="d-flex justify-content-between">
              <div className="fw-bold fs-5">Skills</div>
              <div className="me-4">
                <button className={ `btn border border-2 border-dark rounded ${styles.rem}` } onClick={ () => ch_as_flag(2) }>
                  <FontAwesomeIcon icon={ faPlus } />
                </button>
              </div>
            </div>
            <Skills Skills={ profile_demo.skills } changer={ ch_skill } />
          </div>
        </div>
        <div className={ `border ${styles.posts} rounded-bottom-0` }>
          <div
            className="fw-bold fs-5 d-block text-center p-1"
            style={ { borderBottom: "1px solid black" } }
          >
            Messaging
          </div>
          <div style={ { overflowY: "scroll", height: "400px", paddingBottom: "10px" } }>
            <div className={ styles.msg_cont }>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              voluptatibus perspiciatis, quo enim vel sit quisquam asperiores natus
              praesentium tempore. Provident quod quo beatae dolorum eaque minus
              laborum. Suscipit reprehenderit laudantium fugiat sint neque.
            </div>
            <div className={ styles.msg_cont }>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              voluptatibus perspiciatis, quo enim vel sit quisquam asperiores natus
              praesentium tempore. Provident quod quo beatae dolorum eaque minus
              laborum. Suscipit reprehenderit laudantium fugiat sint neque.
            </div>
            <div className={ styles.msg_cont }>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
              voluptatibus perspiciatis, quo enim vel sit quisquam asperiores natus
              praesentium tempore. Provident quod quo beatae dolorum eaque minus
              laborum. Suscipit reprehenderit laudantium fugiat sint neque.
            </div>
          </div>
          <div
            className="w-100 d-flex fixed-bottom"
            style={ { marginTop: "5px", position: "relative" } }
          >
            <textarea
              placeholder="Enter Text..."
              className="mx-2 w-75"
              style={ { overflowY: "hidden" } }
              rows={ 2 }
              defaultValue={ "" }
            />
            <a
              className="fa-regular fa-paper-plane m-2"
              style={ { fontSize: "xx-large" } }
              id="send_msg"
            ></a>
          </div>
        </div>
      </div>
      { (as_flag == 2 || exp_flag == 2 || edu_flag == 2) && <AddLink /> }
      { as_flag == 2 && <Add_skill chflag={ ch_as_flag } skills={ profile_demo.skills } changer={ ch_skill } /> }
      { exp_flag == 2 && <Add_Exp chflag={ ch_exp_flag } companies={ profile_demo.experience } changer={ ch_exp } /> }
      { edu_flag == 2 && <Add_Edu chflag={ ch_edu_flag } colleges={ profile_demo.education } changer={ ch_edu } /> }

    </div>



  )
}