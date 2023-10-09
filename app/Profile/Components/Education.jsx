import "bootstrap/dist/css/bootstrap.css";
import styles from "../CSS/Profile.module.css";

export default function Education({Colleges})
{
    return(
        <div className="mt-3">
            {Colleges.map(clg =>
                <div className={`d-flex  ${styles.list} `}>
                <img src={clg.img} className={styles.list_img} />
                <div>
                  <div className={styles.ins}>
                  {clg.name}
                  </div>
                  <div className={styles.remarks}>
                    {clg.edu}
                  </div>
                  <div className={styles.timeRange}>{clg.yearRange}</div>
                </div>
              </div>
                )}
        </div>
    )
}