
import styles from "../_css/Profile.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
export default function Experience({Companies,changer})
{

    return(
      <div className="mt-3">
      {Companies.map((cmp,index) =>
          <div className={`d-flex  ${styles.list} `} key={index}>
          <img src={cmp.img} className={styles.list_img} />
          <div>
            <div className={styles.ins}>
            {cmp.company_name}
            </div>
            <div className={styles.remarks}>
              {cmp.job_role}
            </div>
            <div className={styles.timeRange}>{cmp.starting_year}-{cmp.ending_year}</div>
          </div>
          <div className="ms-auto pt-3">
                  <button className={`btn border rounded ${styles.rem}`}  onClick={ () => {Companies.splice(index,1)
                  changer(Companies)
                }}>
                  <FontAwesomeIcon icon={faMinus} />
                  </button>
                  </div>
        </div>
          )}
  </div>
    )
}