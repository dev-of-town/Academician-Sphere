
import DatePicker from "react-datepicker";
import styles from "../_css/Profile.module.css";
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";
import SearchBar from "../../../_components/SearchBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export default function AddProject({chflag, projects, addProject, currentUser}) {

    const [newProject, setNewProject] = useState({
        projectName: "",
        startingMonth: new Date().toISOString().slice(0, 7),
        endingMonth: new Date(new Date().setDate(new Date().getDate() + 90)).toISOString().slice(0, 7),
        githubLink: "",
        description:"",
        members:[currentUser]
    })

    console.log("hjhjhgdjjsd", newProject);

    function checkAndAddNewProject () {
        if(newProject.projectName === "") {
            window.alert("!!! PROJECT TITLE CAN'T BE EMPTY")
            return;
        }
        else if(newProject.githubLink === ""){
            window.alert("!!! PLEASE PROVIDE PROJECT LINK");
            return;
        }

        addProject(projects.unshift(newProject));

        chflag(1);
    }

    function removeUser(user) {
        if(user._id === currentUser._id) {
            window.alert("!!! YOU CAN'T REMOVE YOURSELF FROM YOUR OWN PROJECT");
        }
        else {
        const tempArray = newProject.members.filter(obj => obj._id !== user._id);
        setNewProject((newProject)=>({...newProject, members: tempArray}));
        }
      }

    return (
        <div className={ styles.ontabs }>
           <div className="fs-1 mb-3 fw-semibold" >Add Project</div>
                <div>Title&nbsp;({newProject.projectName.length}/12)</div>
                <div >
                    <input type="text" maxLength={12} className="border-primary rounded w-100 px-1 text-primary-emphasis fw-semibold" value={ newProject.projectName } onChange={ (e) => { setNewProject({ ...newProject, projectName: e.target.value }) } } />
                </div>
                
                <div>Github Link</div>
                <div >
                    <input type="text"  className="border-primary rounded w-100 px-1 text-primary-emphasis fw-semibold" value={ newProject.githubLink } onChange={ (e) => { setNewProject({ ...newProject, githubLink: e.target.value }) } } />
                </div>
                
                <div>Description&nbsp;({newProject.description.length}/720)</div>
                <div >
                    <textarea  maxLength={720} rows={3} className="border-primary rounded w-100 px-1 text-primary-emphasis fw-semibold" value={ newProject.description } onChange={ (e) => { setNewProject({ ...newProject, description: e.target.value }) } } />
                </div>
                
                <div className="d-flex justify-content-between">
                    <div className="pe-2 text-center ">
                        Started
                        
                        <input type="month" value={newProject.startingMonth} className="w-100  text-center text-primary-emphasis fw-semibold border border-dark" onChange={ (e) => { setNewProject({ ...newProject, startingMonth: e.target.value }) } }/>
                    </div>

                    <div className="text-center">
                        
                        Finishes 
                        
                        <input type="month" min={newProject.startingMonth} value={newProject.endingMonth} className="w-100 text-center text-primary-emphasis fw-semibold border border-dark" onChange={ (e) => { setNewProject({ ...newProject, endingMonth: e.target.value }) } }/>
                    </div>
                </div>
                <div className="d-flex gap-2 mt-2 ">

                    <div className="w-50">
                        <
                            SearchBar 
                            onlyUser={true} 
                            isFromCreateProject = {true}
                            newProject={newProject}
                            setNewProject = {setNewProject}
                            
                        />
                    </div>
                    <div className="overflow-scroll border w-50  border-primary border-2 rounded ">
                       <div className="fw-bold text-primary  border-bottom  border-dark border-3 ps-1 py-1">
                            {newProject.members.length} Member{newProject.members.length>1 && "s"}
                        </div>
                        
                        {
                            newProject.members.map((item, index) => (
                                <div key={index} className="d-flex justify-content-between border-bottom  border-primary border-1 px-1">
                                
                                    <div>
                                        {item.username}
                                    </div>
                                    <div onClick={()=>removeUser(item)}>
                                        <FontAwesomeIcon className={styles.removeIcon} icon={faXmark} />
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            <div className="mt-2">
                <button className="btn btn-success float-left" onClick={ () => chflag(1) }>Cancel</button>
                <button className="btn btn-success float-end" onClick={ ()=>{checkAndAddNewProject()} }>Add</button>
            </div>
        </div>

    )
}