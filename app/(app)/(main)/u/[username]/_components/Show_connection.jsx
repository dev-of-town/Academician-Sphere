import "bootstrap/dist/css/bootstrap.css";
import styles from "../_css/Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import ProfileCard from "../../../_components/ProfileCard";

export default function Show_connection({ list }) {
  const en =
    Math.floor(list.length / 10) + Math.floor(((list.length % 10) + 9) / 10);
  console.log("en", en);
  const [i, ch_i] = useState(1);


  return (
    <div className={styles.container}>
      {list
        .map((list_item, index) => (
          <ProfileCard
            community={list_item.username}
            profileimage={list_item.Profile_img}
            key={index}
          />
        ))}

      {/* //   <div className={`d-flex  ${styles.list} `} key={index}>
          //     <img src={list_item.profile_img} className={styles.list_img} />
          //     <div key={index}>
          //       <div className={styles.ins}>{list_item.username}</div>
          //       <div className={styles.remarks}>{list.about}</div>
          //     </div>
          //   </div> */}

      <div className="d-flex justify-content-between">
        {i !== 1 && (
          <button onClick={() => ch_i(i - 1)}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}

        <div>
          {list.length === 0
            ? "Showing 0-0 entries of total 0 entries"
            : `Showing ${10 * (i - 1) + 1}-${
                Math.min(10 * i - 1, list.length - 1) + 1
              } entries of total 0 entries`}
        </div>
        <div>
          {list.length === 0
            ? "Showing 0-0 entries of total 0 entries"
            : `Showing ${10 * (i - 1) + 1}-${
                Math.min(10 * i - 1, list.length - 1) + 1
              } entries of total 0 entries`}
        </div>

        {i != en && (
          <button onClick={() => ch_i(i + 1)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </div>
  );
}
