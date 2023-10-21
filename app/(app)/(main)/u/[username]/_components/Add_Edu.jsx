import "bootstrap/dist/css/bootstrap.css";
import styles from "../_css/Profile.module.css";
import { useState } from "react";
export default function Add_Edu({ colleges, chflag,changer }) {

    const [newEdu, chnewEdu] = useState({
        name: "",
        end: "present",
        img: "",
        start: "",
        degree: "",
        field:""
    })

    function check_and_add() {
        let year_regex = new RegExp(/[1-2]{1}[0-9]{3}/)

        let dt = new Date();
     //   window.alert(dt.getFullYear());
        if (newEdu.name != "" && newEdu.role != "" && year_regex.test(newEdu.start) == true &&  newEdu.start.localeCompare(dt.getFullYear()) <= 0 && newEdu.start.localeCompare("1900") >= 0 ) 
        {
            if((year_regex.test(newEdu.end) == true && newEdu.start.localeCompare(newEdu.end) <= 0  ) || (newEdu.end.toLowerCase()=="present"))
            {colleges.unshift(newEdu);
                changer(colleges)
                
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
            <div className="fs-5 mb-3 fw-semibold" >Add Education</div>
            <div >Institute</div>
            <div >
                <input type="text" className="border-primary rounded" value={ newEdu.name } onChange={ (e) => { chnewEdu({ ...newEdu, name: e.target.value }) } } />
            </div>

            <div className="d-flex" >

                <div>
                    <div >Starting year</div>
                    <div >
                        <input type="text" className="border-primary rounded" value={ newEdu.start } onChange={ (e) => { chnewEdu({ ...newEdu, start: e.target.value }) } } />
                    </div>
                </div>
                <div style={{width:"12px"}}></div>
                <div>
                    <div >Ending year</div>
                    <div >
                        <input type="text" className="border-primary rounded" value={ newEdu.end } onChange={ (e) => { chnewEdu({ ...newEdu, end: e.target.value }) } } />
                    </div>
                </div>
            </div>

            <div >Degree</div>
            <div>

                <input type="text" placeholder="ex master of science" className="border-primary rounded"  value={ newEdu.degree } onChange={ (e) => { chnewEdu({ ...newEdu, degree: e.target.value }) } } />
            </div>
            <div >Field</div>
            <div>

                <input type="text" placeholder="ex biochemistry" className="border-primary rounded"  value={ newEdu.field } onChange={ (e) => { chnewEdu({ ...newEdu, field: e.target.value }) } } />
            </div>

            <div className="mt-2">
                <button className="btn btn-success float-left" onClick={ () => chflag(1) }>Cancel</button>
                <button className="btn btn-success float-end" onClick={ check_and_add }>Add</button>
            </div>
        </div>



    )
}