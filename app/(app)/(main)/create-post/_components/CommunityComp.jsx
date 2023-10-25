import Image from "next/image";
import styles from "../_css/createPost.module.css";

function clicker(name = "whatever") {
  console.log("I am clicked", name);
}

export default function CommunityComp({
  all_c,
  changer,
  user_community,
  i,
  usercoms,
}) {
  console.log("Checking", all_c);

  return (
    <li>
      <div className="d-flex text-decoration-none">
        <input
          type="checkbox"
          id={i}
          defaultChecked={user_community.selected}
          onClick={(e) => {
            //e.preventDefault()
            console.log("the clicked", i);
            // user_community.selected=!user_community.selected
            const all_c_temp = [...all_c];

            all_c_temp[i].selected = !all_c_temp[i].selected;

            console.log("TEMP ", all_c_temp);
            console.log("ALL C", all_c_temp);
            usercoms.coms = [...all_c];
            changer(all_c_temp);
          }}
        />
        <label htmlFor={i} className="d-flex ms-3">
          <Image
            className="sub_photo align-self-center"
            src={user_community.profile_img.url}
            width={25}
            height={25}
            alt={user_community.name}
          />
          <div className={styles.cname_nom}>
            <div className={styles.cname}>{user_community.name}</div>
            {/* <div className={styles.nom}>
              {user_community.participants.length} members
            </div> */}
          </div>
        </label>
      </div>
    </li>
  );
}
