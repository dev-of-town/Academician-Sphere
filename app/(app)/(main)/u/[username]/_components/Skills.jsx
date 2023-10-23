
import styles from "../_css/Profile.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

export default function Skills({Skills,changer})
{
    return(
      <div className="mt-3">
      {Skills.map((skill,index) =>
          <div className={`d-flex  ${styles.list} `} key={index}>
           
          <div>
            <div className={styles.ins}>
            {skill.skill}
            </div>
            <div className={styles.remarks}>
              {skill.level}
            </div>
            <div className={styles.timeRange}>{skill.ins}</div>
          </div>
          <div className="ms-auto pt-3">
                  <button className={`btn border rounded ${styles.rem}`}  onClick={ () => {Skills.splice(index,1)
                  changer(Skills)
                }}>
                  <FontAwesomeIcon icon={faMinus} />
                  </button>
                  </div>
        </div>
          )}
  </div>
    )
}