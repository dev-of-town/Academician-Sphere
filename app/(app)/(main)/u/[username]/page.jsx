"use client";

import React, { useEffect, useRef, useState } from "react";

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

import Show_connection from "./_components/Show_connection";
import { useRouter } from "next/navigation";
import Projects from "./_components/Projects";
import AddProject from "./_components/add-projects";

const getData = async (id) => {
  try {
    console.log("In get method");
    const res = await (await fetch(`/api/getuser/${id}`)).json();
    console.log(res, res.user, 123);
    if (res.success) {
      return res.user;
    }
    return null;
  } catch (error) {
    console.error("this is error !!!", error.message);
    return null;
  }
};

export default async function page({ params: { username } }) {
  const [profile_demo, ch_profile_demo] = useState(null);
  const [sh_flag, chsh_flag] = useState(1);
  const [addProjectFlag, setAddProjectFlag] = useState(1);
  const [error1, setIsError] = useState("");
  const [as_flag, ch_as_flag] = useState(1);
  const [exp_flag, ch_exp_flag] = useState(1);
  const dataFetchedRef = useRef(false);

  const [edu_flag, ch_edu_flag] = useState(1);
  const [counter, setCounter] = useState(0);

  function getCurrentUser() {
    let currentUser = {
      username : profile_demo.username,
      _id: profile_demo._id
    }
    return currentUser;
  }
  


  useEffect(() => {
    getData(username)
      .then((res) => {
        if (res !== null ) 
        {
        
          ch_profile_demo({...res
            // projects:
            //   [
            //     {
            //       title:"Ray Optics Visualizer",
            //       start:"Sept/2020",
            //       end:"Oct/2020",
            //       description: "Hello folks !I along with my team mates Dhruvchandra Bhatt ",
            //       members: [
            //          {id:"",username:"Karm soni"}
            //         ,{id:"",username:"Aayush dalal"}
            //         ,{id:"",username:"Dhruvchandra bhatt"}
            //         ,{id:"",username:"Bhaumik lodhiya"}
            //       ],
            //       performanceVideo:
            //       {
            //         isYoutube:true,
            //         link:"ndjndf"
            //       }
            //     }
            //   ]
          });
        }
        else ch_profile_demo(null);
        console.log("Resource ",res);
        console.log(profile_demo, "Profile demo");
      })
      .catch((error) => {
        console.log(error);
      });

    
  }, []);



  let formdata = new FormData();

  const router = useRouter();
    let ch_skill = (arr) => {
    ch_profile_demo({ ...profile_demo, education: arr });
    patchDemo();
  };

  let ch_gen = (newgen, pr_file, bc_file, prchange, bcchange) => {
    ch_profile_demo(newgen);

    profile_demo.username = newgen.username;
    profile_demo.bio = newgen.bio;
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

  let addProject = (projects) => {
    ch_profile_demo({ ...profile_demo, projects: projects });
    console.log("Pr : ");
    console.log(profile_demo);
    patchDemo();
  }

  const patchDemo = async () => {
    formdata.set("json", JSON.stringify(profile_demo));
    // console.log("Just b patch", formdata.get("profile_img"));
    try {
      const response = await fetch("http://localhost:4041/edit-profile", {
        method: "PATCH", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, *cors, same-origin
        body: formdata, // body data type must match "Content-Type" header
      });
      const data = await response.json();
      console.log("response from patch");
      if (data.success) router.refresh();
    } catch (error) {
      setIsError(error.message);
    }
  };

  console.log("testing", profile_demo);

  return (
    <div className={styles.Profile_body}>
      <div className={styles.ch_dip} style={{ margin: "10px auto" }}>
        <div>
          {<Name_images profile_demo_gen={profile_demo} changer={ch_gen} />}
          <div className={`border ${styles.tabs} pt-3 ps-3`}>
            <div className="d-flex justify-content-between">
              <div className="fw-bold fs-5">Education</div>
              <div className="me-4">
                
                {profile_demo && profile_demo.flag == 1 && (
                  <button
                    className={`btn border border-2 border-dark rounded ${styles.rem}`}
                    onClick={() => ch_edu_flag(2)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </div>
            </div>
            <Education
              c={profile_demo ? profile_demo.education : []}
              changer={ch_edu}
              chuser={profile_demo && profile_demo.flag}
            />
          </div>
          <div className={`border ${styles.tabs} pt-3 ps-3`}>
            <div className="d-flex justify-content-between">
              <div className="fw-bold fs-5">Experience</div>
              <div className="me-4">
                {profile_demo && profile_demo.flag == 1 && (
                  <button
                    className={`btn border border-2 border-dark rounded ${styles.rem}`}
                    onClick={() => ch_exp_flag(2)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </div>
            </div>{" "}
            <Experience
              Companies={profile_demo ? profile_demo.experience : []}
              changer={ch_exp}
              chuser={profile_demo && profile_demo.flag}
            />
          </div>
          <div className={`border ${styles.tabs} pt-3 ps-3 `}>
            <div className="d-flex justify-content-between">
              <div className="fw-bold fs-5">Skills</div>
              <div className="me-4">
                {profile_demo && profile_demo.flag == 1 && (
                  <button
                    className={`btn border border-2 border-dark rounded ${styles.rem}`}
                    onClick={() => ch_as_flag(2)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                )}
              </div>
            </div>
            <Skills
              Skills={profile_demo ? profile_demo.skills : []}
              changer={ch_skill}
              chuser={profile_demo && profile_demo.flag}
            />
          </div>

          <div className={`border ${styles.tabs} pt-3 ps-3 `}>
            <div className="d-flex justify-content-between">
              <div className="fw-bold fs-5">Projects</div>
              <div className="me-4">
                {
                  profile_demo && profile_demo.flag == 1 && (
                      <button
                        className={`btn border border-2 border-dark rounded ${styles.rem}`}
                        onClick={() => setAddProjectFlag(2)}
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                  )
                }
              </div>
            </div>
            <Projects
              projects={profile_demo ? profile_demo.projects : []}
              chuser={profile_demo && profile_demo.flag}
              changer={addProject}
            />
          </div>
        </div>
        <div className={`border ${styles.posts} rounded-bottom-0`}>
          <div
            className="fw-bold fs-5 d-block text-center p-1"
            style={{ borderBottom: "1px solid black" }}
          > 
            {profile_demo !=null ? profile_demo.username: ""} Joined{" "}
            {profile_demo  &&  profile_demo.following.length} Communities
          </div>
          <div style={{ paddingBottom: "10px" }} className={styles.someclass}>
            <Show_connection
              id={profile_demo ? profile_demo._id:""}
            />
          </div>
        </div>
        {(as_flag == 2 || exp_flag == 2 || edu_flag == 2 || addProjectFlag==2) && <AddLink />}
        {as_flag == 2 && (
          <Add_skill    
            chflag={ch_as_flag}
            skills={profile_demo ? profile_demo.skills : []}
            changer={ch_skill}
          />
        )}
        {exp_flag == 2 && (
          <Add_Exp
            chflag={ch_exp_flag}
            companies={profile_demo ? profile_demo.experience : []}
            changer={ch_exp}
          />
        )}
        {edu_flag == 2 && (
          <Add_Edu
            chflag={ch_edu_flag}
            colleges={profile_demo ? profile_demo.education : []}
            changer={ch_edu}
          />
        )}
        {
          addProjectFlag==2 && (
            <AddProject
            chflag={setAddProjectFlag}
            projects={profile_demo ? profile_demo.projects : []}
            addProject={addProject}
            currentUser={getCurrentUser()}
            />
          )
        }
      </div>
    </div>
  );
}
