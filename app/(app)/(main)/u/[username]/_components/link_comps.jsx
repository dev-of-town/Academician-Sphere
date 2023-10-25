
import styles from "../_css/Profile.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import AddLink from "./AddLink";
import AddLink2 from "./AddLink2";
import { useState } from "react";

export default function Give_Link({progile_demo_gen,link,index,changer})
{

    const [rem_flag, chrem_flag] = useState(1);
        return(
      
            <button className={ `${styles.links} btn btn-light d-flex` } onMouseOver={ () => chrem_flag(2) } onMouseOut={ () => chrem_flag(1) }>
                <a href={ link.link } className={ styles.links_btn_a }>{ link.name }</a>
                { rem_flag == 2 && progile_demo_gen.flag==1 && 
                 <button className={ ` btn btn-light ms-auto ` }  onClick={ () => {
                    progile_demo_gen.links.splice(index, 1)
                    changer(progile_demo_gen)
                    chrem_flag(1)
                } }>
                    <a className={ styles.links_btn_a }>
                        <span className="d-flex">
                            <FontAwesomeIcon icon={ faMinus } style={ { color: "black" } } />

                        </span>

                    </a>
                </button> }

            </button>
    

    )
}