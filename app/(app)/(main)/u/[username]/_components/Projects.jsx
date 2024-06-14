
import styles from "../_css/Profile.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'

export default function Projects({ c, changer, projects }) {
  //console.log("Printing clgs",c[0])


  return (
    <div className="mt-3">
      { projects.map((prj, index) =>
        <div className={ `d-flex  ${styles.list} ` } key={ index }>
          {/* <img src={clg.img} className={styles.list_img} /> */ }
          <div>
            <div className={ styles.projects_title }>
              { prj.title }
            </div>

            <div className={ styles.timeRange }>{ prj.start }-{ prj.end }</div>
            <div className={ styles.projects_members }>
              { prj.members.length + " Members" }
            </div>

            <div className={styles.projects_member_container}>
            
              <ul className="d-flex justify-content-end container row">
                
                {
                  prj.members.map((member,index)=>
                  <li className="col-md-6 col-sm-12" style={{listStyleType:"none"}} >
                  {
                    
                    
                     
                      <details>
                        <summary>
                        {member.user_detail.username}
                        </summary>
                        {member.contribution}
                        </details>

                   
                  }
                   </li>
                  )
                }
              </ul>
              </div>



          </div>

        </div>
      )}
      </div>
  )}
                
         