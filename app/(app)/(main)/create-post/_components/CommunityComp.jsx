import Image from "next/image";
import styles from "../_css/createPost.module.css";

function clicker(name = "whatever") {
  console.log("I am clicked", name);
}

export default function CommunityComp({all_c,changer, user_community,i }) {

  console.log("Checking",all_c);

  return (
    <li
      onClick={(e) => {
        //e.preventDefault()
console.log("the clicked",i);
      // user_community.selected=!user_community.selected
      const all_c_temp =[... all_c];
     

       all_c_temp[i].selected = !all_c_temp[i].selected;
       
       console.log("TEMP ",all_c_temp)
       console.log("ALL C",all_c_temp);
       changer(all_c_temp);
      }}
    >
      <a className="d-flex text-decoration-none " href="#">

        <input type="checkbox" id={i} checked={user_community.selected} />
        <label htmlFor={i} className="d-flex ms-3">
        <Image className="sub_photo align-self-center" src={user_community.comm.profile_img} width={25} height={25}/>
        <div className={styles.cname_nom}>
          <div className={styles.cname}>{user_community.comm.name}</div>
           <div className={styles.nom}>
                            {user_community.comm.participants.length} members
                        </div> 
        </div>
        </label>

      </a>
    </li>
  );
}
