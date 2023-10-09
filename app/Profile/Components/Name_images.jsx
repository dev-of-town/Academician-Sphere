
import "bootstrap/dist/css/bootstrap.css";
import styles from "../CSS/Profile.module.css";
import Other_webs from "./Other_webs";
export default function Name_images({flag,username,profile_img,background_img,DOB,saved_posts=null,liked_posts=null,followers=0,following=0,posts=null,institute=null,links})
{
    return(

    <div className={`border ${styles.tabs}`}>
    <img src={profile_img} className={styles.pic1} />
    <img className={styles.profile_photo} src={background_img} />
   
    <div style={{ marginTop: "50px" }} className={styles.inf_con}>
      <div className="container-fluid row">
        <div className="col-md-8 col-12">
            <div className="d-flex justify-content-between">
       {flag==1 && <div> <a href="#">See posts</a> </div>}
        {flag==2 && <div><a href="#">Saved posts</a> </div>}
     
          </div>
          <div className={`fw-bold fs-3 ${styles.name}`} >
            {username}
          </div>
          {/* follow button */}
          <div className={styles.remarks}>I am very bad singer</div>
          <div  className={`text-secondary ${styles.address}`}>
            Patna,Bihar
          </div>
        </div>
        <div className="col-md-4 col-12 d-flex">
          <img
            id="ins_logo"
            src={institute.img}
            className={` align-self-center me-2 ${styles.ins_logo}`}
          />
          <div className={styles.ins}>{institute.name}</div>
        </div>
      </div>
      <Other_webs links={links}/>
    </div>
  </div>
    )
}
