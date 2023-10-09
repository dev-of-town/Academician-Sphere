import "bootstrap/dist/css/bootstrap.css";
import styles from "../CSS/Profile.module.css";

export default function Experience({Companies})
{
    return(
      <div className="mt-3">
      {Companies.map(cmp =>
          <div className={`d-flex  ${styles.list} `}>
          <img src={cmp.img} className={styles.list_img} />
          <div>
            <div className={styles.ins}>
            {cmp.name}
            </div>
            <div className={styles.remarks}>
              {cmp.role}
            </div>
            <div className={styles.timeRange}>{cmp.yearRange}</div>
          </div>
        </div>
          )}
  </div>
    )
}