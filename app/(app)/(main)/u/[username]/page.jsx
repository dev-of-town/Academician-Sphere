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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "./_components/axios.jsx";
import { headers } from "@/next.config";
import Show_connection from "./_components/Show_connection";
import { useRouter } from "next/navigation";

const getData = async (id) => {
  try {
    console.log("In get method");
    const res = await axios.get(`/u/${id}`);
    console.log(res, res.data, 123);
    if (res.data.success) {
      return res.data.user;
    }
    return null;
  } catch (error) {
    // setIsError(error.message);
    console.error("this is error !!!", error.message);
    return null;
  }
};

export default function page({ params }) {
  console.log(params, "This is params");
  const [profile_demo, ch_profile_demo] = useState(null);
  const [sh_flag, chsh_flag] = useState(1);
  const [error1, setIsError] = useState("");
  const [as_flag, ch_as_flag] = useState(1);
  const [exp_flag, ch_exp_flag] = useState(1);
  const [edu_flag, ch_edu_flag] = useState(1);
  
  useEffect(() => {
    // console.log("hello ", window.location.href);
    //  getData()
    getData(params.username)
      .then((res) => {
        console.log(res, "In getData dhruv");
        ch_profile_demo({...res,flag:2});
        console.log(profile_demo,"Profile demo");
      })
      .catch((error) => {
        console.log(error);
    });
  }, []);
  

  // console.log("Path",window.location.href);

  let formdata = new FormData();

  const router = useRouter();
  // const [profile_demo, ch_profile_demo] = useState({
  //   flag: 2,
  //   username: "Rushabh Gandhi",
  //   profile_img: "/rays.jpg",
  //   background_img: "/rays.jpg",

  //   about: "I am very bad singer",
  //   followers: 345,
  //   following: 89,
  //   institute: {
  //     name: "The Maharaja sayajirao university of baroda",
  //     img: "/rays.jpg",
  //   },
  //   links: [
  //     { name: "Leetcode", link: "https://leetcode.com/dhruvbhatt553/" },
  //     { name: "Naukri.com", link: "https://leetcode.com/dhruvbhatt553/" },
  //     { name: "Instagram", link: "https://leetcode.com/dhruvbhatt553/" },
  //     { name: "Github", link: "https://leetcode.com/dhruvbhatt553/" },
  //   ],
  //   education: [
  //     {
  //       name: "GSFC",
  //       img: "/rays.jpg",
  //       degree: "Bechlor of technology-BE",
  //       field: "Chemical Engg..",
  //       start: "2021",
  //       end: "2025",
  //     },
  //     {
  //       name: "Phoniex school",
  //       img: "/rays.jpg",
  //       degree: "12th",
  //       field: "Chemical Engg..",
  //       start: "2019",
  //       end: "2021",
  //     },
  //     {
  //       name: "GSFC",
  //       img: "/rays.jpg",
  //       degree: "time pass",
  //       field: "Chemical Engg..",
  //       start: "2018",
  //       end: "2019",
  //     },
  //   ],

  //   experience: [
  //     {
  //       company_name: "Deepak nitrate",
  //       img: "/rays.jpg",
  //       job_role: "Chemical Engg..",
  //       starting_year: "2012",
  //       ending_year: "2014",
  //     },
  //     {
  //       company_name: "Tata Chemicals",
  //       img: "/rays.jpg",
  //       job_role: "Chemical Engg",
  //       starting_year: "2016",
  //       ending_year: "2017",
  //     },
  //     {
  //       company_name: "siemens",
  //       img: "/rays.jpg",
  //       job_role: "Chemical Engg..",
  //       starting_year: "2020",
  //       ending_year: "2023",
  //     },
  //   ],

  //   skills: [
  //     { skill: "C", level: "Intermidiate", ins: "MSU" },
  //     { skill: "C++", level: "Intermidiate", ins: "MSU" },
  //     { skill: "JAVA", level: "Intermidiate", ins: "MSU" },
  //     { skill: "DSA", level: "Intermidiate", ins: "MSU" },
  //   ],

  //   followers: [
  //     { username: "manoj", about: "kfjkhgjhfjdhjg", Profile_img: "/rays.jpg" },
  //     { username: "manan", about: "jkjfkdhgjdhg", Profile_img: "/rays.jpg" },
  //     { username: "yash", about: "aiiirjnnv ", Profile_img: "/rays.jpg" },
  //   ],

  //   followings: [
  //     { username: "sharma", about: "mdv  vnm v", Profile_img: "/rays.jpg" },
  //     { username: "sanu", about: "ncbdhbgvhgv", Profile_img: "/rays.jpg" },
  //     {
  //       username: "sangakara",
  //       about: "dkjfjdhvijdjg ",
  //       Profile_img: "/rays.jpg",
  //     },
  //   ],
  // });

  // console.log("Printing ", profile_demo.education);


  let ch_skill = (arr) => {
    ch_profile_demo({ ...profile_demo, education: arr });
    patchDemo();
  };

  let ch_gen = (newgen, pr_file, bc_file, prchange, bcchange) => {
    ch_profile_demo(newgen);

    profile_demo.username = newgen.username;
    profile_demo.about = newgen.about;
    if (prchange == 1) {
      console.log("-----------------pr-----------------");
      profile_demo.changeProfile = true;
      formdata.append("profile_img", pr_file[0]);
    }
    if (bcchange == 1) {
      console.log("-----------------bc-----------------");
      profile_demo.changeBackground = true;
      formdata.append("background_img", bc_file[0]);
    }

    console.log("Chck files", pr_file, bc_file);

    console.log("Pr : ");
    console.log(profile_demo);
    patchDemo();
  };

  let ch_exp = (arr) => {
    ch_profile_demo({ ...profile_demo, experience: arr });
    console.log("Pr : ");
    console.log(profile_demo);
    patchDemo();
  };

  let ch_edu = (arr) => {
    ch_profile_demo({ ...profile_demo, education: arr });
    console.log("Pr : ");
    console.log(profile_demo);
    patchDemo();
  };

  const patchDemo = async () => {
    formdata.set("json", JSON.stringify(profile_demo));
    // console.log("Just b patch", formdata.get("profile_img"));
    try {
      const response = await fetch("http://localhost:4041/edit-profile", {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        body: formdata, // body data type must match "Content-Type" header
      });
      const data = await response.json()
      console.log("response from patch", );
      if(data.success) router.refresh();
    } catch (error) {
      setIsError(error.message);
    }
  };

  console.log("testing", profile_demo);

  return (
    <div className={styles.Profile_body}>
      <div className={styles.ch_dip} style={{ margin: "10px auto" }}>
        <div>
          <Name_images profile_demo_gen={profile_demo} changer={ch_gen} />
          <div className={`border ${styles.tabs} pt-3 ps-3`}>
            <div className="d-flex justify-content-between">
              <div className="fw-bold fs-5">Education</div>
              <div className="me-4">
                <button
                  className={`btn border border-2 border-dark rounded ${styles.rem}`}
                  onClick={() => ch_edu_flag(2)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            <Education c={profile_demo?profile_demo.education:[]} changer={ch_edu} />
          </div>
          <div className={`border ${styles.tabs} pt-3 ps-3`}>
            <div className="d-flex justify-content-between">
              <div className="fw-bold fs-5">Experience</div>
              <div className="me-4">
                <button
                  className={`btn border border-2 border-dark rounded ${styles.rem}`}
                  onClick={() => ch_exp_flag(2)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>{" "}
            <Experience Companies={profile_demo?profile_demo.experience:[]} changer={ch_exp} />
          </div>
          <div className={`border ${styles.tabs} pt-3 ps-3 `}>
            <div className="d-flex justify-content-between">
              <div className="fw-bold fs-5">Skills</div>
              <div className="me-4">
                <button
                  className={`btn border border-2 border-dark rounded ${styles.rem}`}
                  onClick={() => ch_as_flag(2)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            <Skills Skills={profile_demo?profile_demo.skills:[]} changer={ch_skill} />
          </div>
        </div>
        <div className={`border ${styles.posts} rounded-bottom-0`}>
          <div
            className="fw-bold fs-5 d-block text-center p-1"
            style={{ borderBottom: "1px solid black" }}
          >
            Connections
          </div>
          <div className="d-flex border border-dark border-1">
            <button
              className={`${styles.show_connections_button} border-end border-1 border-dark`}
            >
              Followers
            </button>
            <button className={styles.show_connections_button}>
              Followings
            </button>
          </div>
          <div style={{ paddingBottom: "10px" }} className={styles.someclass}>
            <Show_connection list={profile_demo?profile_demo.followers:[]} />
          </div>
        </div>
        {(as_flag == 2 || exp_flag == 2 || edu_flag == 2) && <AddLink />}
        {as_flag == 2 && (
          <Add_skill
            chflag={ch_as_flag}
            skills={profile_demo?profile_demo.skills:[]}
            changer={ch_skill}
          />
        )}
        {exp_flag == 2 && (
          <Add_Exp
            chflag={ch_exp_flag}
            companies={profile_demo?profile_demo.experience:[]}
            changer={ch_exp}
          />
        )}
        {edu_flag == 2 && (
          <Add_Edu
            chflag={ch_edu_flag}
            colleges={profile_demo?profile_demo.education:[]}
            changer={ch_edu}
          />
        )}
      </div>
    </div>
  );
}
