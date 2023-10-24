import Image from "next/image";
import styles from "../_css/createPost.module.css";

function clicker(name = "whatever") {
  console.log("I am clicked", name);
}

export default function CommunityComp({all_c,changeCon, user_community,index }) {
  return (
    <li
      onClick={(e) => {
        //e.preventDefault()

       user_community.selected=!user_community.selected
       all_c[index] = user_community;
       changeCon(all_c);
      }}
    >
      <a className="d-flex text-decoration-none " href="#">
        <Image className="sub_photo align-self-center" src={user_community.comm.profile_img} width={25} height={25}/>
        <div className={styles.cname_nom}>
          <div className={styles.cname}>{user_community.comm.name}</div>
           <div className={styles.nom}>
                            {user_community.comm.participants.length} members
                        </div> 
        </div>
      </a>
    </li>
  );
}
