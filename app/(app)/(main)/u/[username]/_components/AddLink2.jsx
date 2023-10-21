import "bootstrap/dist/css/bootstrap.css";
import styles from "../_css/Profile.module.css";
import { useState } from "react";
export default function AddLink2({ progile_demo_gen, chflag, changer }) {

    const [newLink, chnewLink] = useState({
        name: "",
        link: ""
    })

    function check_and_add() {
        if (newLink.name == "" || newLink.link == "") {
            window.alert("name and field can not be empty");
        }
        else {
            progile_demo_gen.links.push(newLink);
            changer(progile_demo_gen);
            chflag(1);
        }
    }
    return (
        <div className={ styles.ontabs }>
            <div className="fs-5 mb-3 fw-semibold" >Add links</div>
            <div >Name</div>
            <div >
                <input type="text" className="border-primary rounded" value={ newLink.name } onChange={ (e) => { chnewLink({ ...newLink, name: e.target.value }) } } />
            </div>
            <div>
                Link
            </div>
            <div>

                <input type="text" className="border-primary rounded" style={ { color: "blue" } } value={ newLink.link } onChange={ (e) => { chnewLink({ ...newLink, link: e.target.value }) } } />
            </div>

            <div className="mt-2">
                <button className="btn btn-success float-left" onClick={ () => chflag(1) }>Cancel</button>
                <button className="btn btn-success float-end" onClick={ check_and_add }>Add</button>
            </div>
        </div>



    )
}