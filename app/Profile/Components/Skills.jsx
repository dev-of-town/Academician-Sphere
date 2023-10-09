import "bootstrap/dist/css/bootstrap.css";
import styles from "../CSS/Profile.module.css";
import Image from "next/image";

export default function Skills({Skills})
{
    return(
      <div className="mt-3">
      {Skills.map(skill =>
          <div className={`d-flex  ${styles.list} `}>
           
          <div>
            <div className={styles.ins}>
            {skill.name}
            </div>
            <div className={styles.remarks}>
              {skill.level}
            </div>
            <div className={styles.timeRange}>{skill.ins}</div>
          </div>
        </div>
          )}
  </div>
    )
}