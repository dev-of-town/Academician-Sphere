import { useState } from "react";
import AddLink from "./AddLink";

import styles from "../_css/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import Other_webs from "./Other_webs";
import Edit_profile from "./Edit_profile";
import Link from "next/link";
export default function Name_images({ profile_demo_gen, changer }) {
  const [edit_flag, ch_edit_flag] = useState(1);
  console.log("Profile gen ->->->", profile_demo_gen);
  return (profile_demo_gen && (
    
    <div className={`border ${styles.tabs}`}>
      <img
        src={
          profile_demo_gen
            ? profile_demo_gen.background_img.url
            : "/favicon.svg"
        }
        className={styles.pic1}
      />
      {profile_demo_gen && profile_demo_gen.flag == 1 && (
        <button
          className="btn"
          style={{ float: "right", margin: "3px", color: "blue" }}
          onClick={() => ch_edit_flag(2)}
        >
          <a>
            <FontAwesomeIcon icon={faUserPen} />
          </a>
        </button>
      )}
      <img
        className={styles.profile_photo}
        src={
          profile_demo_gen
            ? profile_demo_gen.profile_img.url
            : "/dummytemplate.jpg"
        }
      />

      <div style={{ marginTop: "50px" }} className={styles.inf_con}>
        <div className="container-fluid row">
          <div className="col-md-8 col-12">
            <div className="d-flex justify-content-between">
              {profile_demo_gen && profile_demo_gen.flag == 0 && (
                <div>
                  {" "}
                  <Link href={`/u/${profile_demo_gen._id}`}>See posts</Link>{" "}
                </div>
              )}
              {profile_demo_gen && profile_demo_gen.flag == 1 && (
                <div>
                  <Link href={`/u/${profile_demo_gen._id}`}>Saved posts</Link>{" "}
                </div>
              )}
            </div>
            <div className={`fw-bold fs-3 ${styles.name}`}>
              {profile_demo_gen ? profile_demo_gen.username : ""}
            </div>
            {/* follow button */}
            <div className={styles.remarks}>
              {profile_demo_gen ? profile_demo_gen.bio : ""}
            </div>
          </div>
          <div className="col-md-4 col-12 d-flex">
            {/* <img
            id="ins_logo"
            src={profile_demo_gen.institute.img}
            className={` align-self-center me-2 ${styles.ins_logo}`}
          /> */}
            <div className={styles.ins}>
              {profile_demo_gen && profile_demo_gen.education.length != 0 &&
                profile_demo_gen.education[0].name}
            </div>
          </div>
        </div>
        <Other_webs
          progile_demo_gen={profile_demo_gen}
          user_flag={profile_demo_gen.flag}
          changer={changer}
        />
      </div>
      {edit_flag == 2 && <AddLink />}
      {edit_flag == 2 && (
        <Edit_profile
          profile_demo_gen={profile_demo_gen}
          change_edit_flag={ch_edit_flag}
          changer={changer}
        />
      )}
    </div>
  ));
}
