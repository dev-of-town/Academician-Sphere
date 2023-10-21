import "bootstrap/dist/css/bootstrap.css";
import styles from "../_css/Profile.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import AddLink from "./AddLink";
import AddLink2 from "./AddLink2";
import Give_Link from "./link_comps";
import { useState } from "react";



export default function Other_webs({ progile_demo_gen, user_flag, changer }) {
    


    const [flag, chflag] = useState(1);
    return (
        <div className="d-flex ms-2 mt-2 justify-content-flex-start" style={ { flexWrap: "wrap" } } >
            { progile_demo_gen.links.map((link, index) =>
            <Give_Link changer={changer} link={link} progile_demo_gen={progile_demo_gen} index={index}/>
              
            )

            }
            {
                user_flag == 2
                &&

                <button className={ `${styles.links} btn btn-light` } onClick={ () => chflag(2) }>
                    <a className={ styles.links_btn_a }>
                        <span className="d-flex">
                            <FontAwesomeIcon icon={ faPlus } style={ { color: "black" } } />

                        </span>

                    </a>
                </button>
            }

            { flag == 2 && <AddLink /> }
            { flag == 2 && <AddLink2 chflag={ chflag } progile_demo_gen={ progile_demo_gen } changer={ changer } /> }
        </div>
    )
}