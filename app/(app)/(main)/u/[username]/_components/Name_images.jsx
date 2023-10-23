import { useState } from "react";
import AddLink from "./AddLink";

import styles from "../_css/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPen } from "@fortawesome/free-solid-svg-icons";
import Other_webs from "./Other_webs";
import Edit_profile from "./Edit_profile";
export default function Name_images({ profile_demo_gen, changer }) {
  const [edit_flag, ch_edit_flag] = useState(1);

  return (
    <div className={`border ${styles.tabs}`}>
      <img src={profile_demo_gen.profile_img} className={styles.pic1} />
      <button
        className="btn"
        style={{ float: "right", margin: "3px", color: "blue" }}
        onClick={() => ch_edit_flag(2)}
      >
        <a>
          <FontAwesomeIcon icon={faUserPen} />
        </a>
      </button>
      <img
        className={styles.profile_photo}
        src={profile_demo_gen.background_img}
      />

      <div style={{ marginTop: "50px" }} className={styles.inf_con}>
        <div className="container-fluid row">
          <div className="col-md-8 col-12">
            <div className="d-flex justify-content-between">
              {profile_demo_gen.flag == 1 && (
                <div>
                  {" "}
                  <a href="#">See posts</a>{" "}
                </div>
              )}
              {profile_demo_gen.flag == 2 && (
                <div>
                  <a href="#">Saved posts</a>{" "}
                </div>
              )}
            </div>
            <div className={`fw-bold fs-3 ${styles.name}`}>
              {profile_demo_gen.username}
            </div>
            {/* follow button */}
            <div className={styles.remarks}>{profile_demo_gen.about}</div>
          </div>
          <div className="col-md-4 col-12 d-flex">
            {/* <img
            id="ins_logo"
            src={profile_demo_gen.institute.img}
            className={` align-self-center me-2 ${styles.ins_logo}`}
          /> */}
            {/* <div className={styles.ins}>{profile_demo_gen.institute.institute_name}</div> */}
          </div>
        </div>
        {/* <Other_webs progile_demo_gen={profile_demo_gen} user_flag={profile_demo_gen.flag} changer={changer}/> */}
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
  );
}
