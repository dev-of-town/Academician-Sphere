import "bootstrap/dist/css/bootstrap.css";
import styles from "../_css/Profile.module.css";
import { useState } from "react";
export default function Add_Exp({ companies, chflag ,changer}) {

    const [newExp, chnewExp] = useState({
        company_name: "",
        ending_year: "present",
        img: "",
        starting_year: "",
        job_role: ""
    })

    function check_and_add() {
        let year_regex = new RegExp(/[1-2]{1}[0-9]{3}/)

        let dt = new Date();
       // window.alert(dt.getFullYear());
        if (newExp.company_name != "" && newExp.job_role != "" && year_regex.test(newExp.starting_year) == true &&  newExp.starting_year.localeCompare(dt.getFullYear()) <= 0 && newExp.starting_year.localeCompare("1900") >= 0 ) 
        {
            if((year_regex.test(newExp.ending_year) == true && newExp.starting_year.localeCompare(newExp.ending_year) <= 0  ) || (newExp.ending_year.toLowerCase()=="present"))
            {companies.unshift(newExp);
                changer(companies)
            chflag(1);
            }
            else{
                window.alert("Anappropriate information , Please enter valid data")

            }
        }
        else {
            window.alert("Anappropriate information , Please enter valid data")
        }
    }
    return (
        <div className={ styles.ontabs }>
            <div className="fs-5 mb-3 fw-semibold" >Add Experience</div>
            <div >Company</div>
            <div >
                <input type="text" className="border-primary rounded" value={ newExp.company_name } onChange={ (e) => { chnewExp({ ...newExp, company_name: e.target.value }) } } />
            </div>

            <div className="d-flex" >

                <div>
                    <div >Starting year</div>
                    <div >
                        <input type="text" className="border-primary rounded" value={ newExp.starting_year } onChange={ (e) => { chnewExp({ ...newExp, starting_year: e.target.value }) } } />
                    </div>
                </div>
                <div style={{width:"12px"}}></div>
                <div>
                    <div >Ending year</div>
                    <div >
                        <input type="text" className="border-primary rounded" value={ newExp.ending_year } onChange={ (e) => { chnewExp({ ...newExp, ending_year: e.target.value }) } } />
                    </div>
                </div>
            </div>

            <div >Job role</div>
            <div>

                <input type="text" className="border-primary rounded" style={ { color: "blue" } } value={ newExp.job_role } onChange={ (e) => { chnewExp({ ...newExp, job_role: e.target.value }) } } />
            </div>

            <div className="mt-2">
                <button className="btn btn-success float-left" onClick={ () => chflag(1) }>Cancel</button>
                <button className="btn btn-success float-end" onClick={ check_and_add }>Add</button>
            </div>
        </div>



    )
}