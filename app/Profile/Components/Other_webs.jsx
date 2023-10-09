import "bootstrap/dist/css/bootstrap.css";
import styles from "../CSS/Profile.module.css";

export default function Other_webs({links})
{
    return(
        <div className="d-flex ms-2 mt-2 justify-content-flex-start" style={{ flexWrap: "wrap" }}>
   { links.map(link => 
   <button className={`${styles.links} btn btn-light`}>
          <a href={link.link} className={styles.links_btn_a}>{link.name}</a>
        </button>)}
    </div>
    )
}