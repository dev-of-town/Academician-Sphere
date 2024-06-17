
import styles from "../_css/Profile.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

export default function Education({c,changer,chuser})
{
  //console.log("Printing clgs",c[0])


    return(
        <div className="mt-3">
            {c.map((clg,index) =>
                <div className={`d-flex  ${styles.list} `} key={index}>
                {/* <img src={clg.img} className={styles.list_img} /> */}
                <div>
                  <div className={styles.ins}>
                  {clg.institute_name}
                  </div>
                  <div className={styles.remarks}>
                    {clg.degree+" in "+clg.field}
                  </div>
                  <div className={styles.timeRange}>{clg.start}-{clg.end}</div>
                </div>
                <div className="ms-auto pt-3">
                  { 
                  chuser==1 &&
                    <button className={`btn border rounded ${styles.rem}`} onClick={ () => {c.splice(index,1)
                        changer(c)
                      }} 
                    >
                    <FontAwesomeIcon icon={faMinus} />
                    </button>
                  }
                </div>
                
              </div>
                )}
        </div>
    )
}