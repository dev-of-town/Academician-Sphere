
import styles from "../_css/Profile.module.css";
import { useState } from "react";
export default function Add_skill({skills,chflag,changer}) {

    const [newSkill,chnewSkill]= useState({
        skill:"",
        level:"Basic",
        institute:""
    })

    function check_and_add()
    {
        if(newSkill.institute=="" || newSkill.skill=="")
        {
            window.alert("institute and technology field can not be empty");
        }
        else{
            skills.push(newSkill);
            changer(skills)
            chflag(1);
        }
    }
    return (
            <div className={ styles.ontabs }>
                <div className="fs-5 mb-3 fw-semibold" >Add Skill</div>
                <div >Technology</div>
                <div >
                <input type="text" className="border-primary rounded" value={newSkill.skill} onChange={(e)=>{chnewSkill({...newSkill,skill:e.target.value})}}/>
                </div>
               
                <div >
          <label htmlFor="occupation" >Expertise  </label>
          <br/>
          <select  name="occupation" className="border-primary rounded mb-2 w-100"  onChange={(e)=>{chnewSkill({...newSkill,level:e.target.value})}}>
            <option value="Basic">Basic</option>
            <option value="Intermidiate">Intermidiate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div >Organization</div>
                <div>
                
                <input type="text"className="border-primary rounded" style={ { color: "blue" } }  value={newSkill.institute} onChange={(e)=>{chnewSkill({...newSkill,institute:e.target.value})}}/>
                </div> 

                <div className="mt-2">
                    <button className="btn btn-success float-left" onClick={()=>chflag(1)}>Cancel</button>
                    <button className="btn btn-success float-end" onClick={check_and_add}>Add</button>
                </div>
            </div>
          
            
     
    )
}