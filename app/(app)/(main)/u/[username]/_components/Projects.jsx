
import styles from "../_css/Profile.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus } from '@fortawesome/free-solid-svg-icons'
import Link from "next/link";
import { useState } from "react";

export default function Projects({ chuser, changer, projects }) {
  {/* projectName: "",
          startingMonth: new Date().toISOString().slice(0, 7),
          endingMonth: new Date(new Date().setDate(new Date().getDate() + 90)).toISOString().slice(0, 7),
          githubLink: "",
          description:"",
          members:[currentUser] */}
  const[doSlice,setDoSlice] = useState(true);

  return (
    <div className="mt-3">
      {projects && projects.map((prj, index) =>
        <div className={ `d-flex  ${styles.list} ` } key={ index }>

          <div>
            <Link className={ styles.projects_title } href={prj.githubLink}>
              { prj.projectName }
            </Link>
            <div style={{width: "90%", textAlign: "justify"}}>
              {doSlice ? prj.description.slice(0,100) : prj.description}
              {doSlice ?
                <span className="text-info fw-bold btn ps-0" onClick={()=>setDoSlice(false)}>
                  Read More
                </span> :
                <span className="text-warning fw-bold btn ps-0" onClick={()=>setDoSlice(true)}>
                Read Less
              </span>
              }
            </div>

            <div className={ styles.timeRange }>{ prj.startingMonth } TO { prj.endingMonth }</div>
            <div className={ styles.projects_members }>
              { prj.members.length + " Members" }
            </div>

            <div className={styles.projects_member_container}>
            
              <ul className="d-flex justify-content-end container row">
                
                {
                  prj.members.map((member,index)=>
                  <li key={index} className="col-md-6 col-sm-12" style={{listStyleType:"none"}}  >
                    <Link href={`/u/${member._id}`}  >
                        {member.username}
                    </Link>
                   </li>
                  )
                }
              </ul>
              </div>



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
  )}
                
         