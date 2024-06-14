
import styles from "../_css/Profile.module.css";
import { useState } from "react";
export default function Add_Edu({ colleges, changeFlag, collegesChanger }) {

    const [newEducation, changeNewEducation] = useState({
        institute_name: "",
        end: "present",
        img: "",
        start: "",
        degree: "",
        field: ""
    })

    function checkAndAdd() {
        let year_regex = new RegExp(/[1-2]{1}[0-9]{3}/)

        let dt = new Date();
        //   window.alert(dt.getFullYear());
        if (newEducation.name != "" && newEducation.role != "" && year_regex.test(newEducation.start) == true && newEducation.start.localeCompare(dt.getFullYear()) <= 0 && newEducation.start.localeCompare("1900") >= 0) {
            if ((year_regex.test(newEducation.end) == true && newEducation.start.localeCompare(newEducation.end) <= 0) || (newEducation.end.toLowerCase() == "present")) {
                colleges.unshift(newEducation);
                collegesChanger(colleges)
                changeFlag(1);
            }
            else {
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
                <input type="text" className="border-primary rounded" value={ newEducation.name } onChange={ (e) => { changeNewEducation({ ...newEducation, institute_name: e.target.value }) } } />
            </div>

            <div className="d-flex" >
                <div>
                    <div >Starting year</div>
                    <div >
                        <input type="text" className="border-primary rounded" value={ newEducation.start } onChange={ (e) => { changeNewEducation({ ...newEducation, start: e.target.value }) } } />
                    </div>
                </div>
                <div style={ { width: "12px" } }></div>
                <div>
                    <div >Ending year</div>
                    <div >
                        <input type="text" className="border-primary rounded" value={ newEducation.end } onChange={ (e) => { changeNewEducation({ ...newEducation, end: e.target.value }) } } />
                    </div>
                </div>
            </div>

            <div >Degree</div>
            <div>

                <input type="text" placeholder="ex master of science" className="border-primary rounded" value={ newEducation.degree } onChange={ (e) => { changeNewEducation({ ...newEducation, degree: e.target.value }) } } />
            </div>
            <div >Field</div>
            <div>

                <input type="text" placeholder="ex biochemistry" className="border-primary rounded" value={ newEducation.field } onChange={ (e) => { changeNewEducation({ ...newEducation, field: e.target.value }) } } />
            </div>

            <div className="mt-2">
                <button className="btn btn-success float-left" onClick={ () => changeFlag(1) }>Cancel</button>
                <button className="btn btn-success float-end" onClick={ checkAndAdd }>Add</button>
            </div>
        </div>



    )
}