import "bootstrap/dist/css/bootstrap.css";
import styles from "../_css/Profile.module.css";
import { useState } from "react";
export default function Edit_profile({ profile_demo_gen, changer, change_edit_flag }) {

    
    const [newgen,newgenchange] = useState({
        // institute: profile_demo_gen.institute,
        username: profile_demo_gen.username,
        profile_img: profile_demo_gen.profile_img,
        background_img: profile_demo_gen.background_img,
      
        about:profile_demo_gen.about

    })

    function check_and_add(e) {
        let year_regex = new RegExp(/[1-2]{1}[0-9]{3}/)
        console.log("In changing")
        //let dt = new Date();
        // window.alert(dt.getFullYear());
        // if (newgen.username == "" || newgen.institute.name == "") {
        //     window.alert("Anappropriate information , Please enter valid data")
        // }
        if (newgen.username == "" ) {
            window.alert("Anappropriate information , Please enter valid data")
        }
        else{
            //patch()
            e.preventDefault();
            //console.log(newgen);
            //console.log("changing ",newgen.username);
            changer({...profile_demo_gen,username:newgen.username,profile_img:newgen.profile_img,background_img:newgen.background_img})

            change_edit_flag(1);
        }

    }
    return (
        <div className={ styles.ontabs }>
            <div className="fs-5 mb-3 fw-semibold" >Edit Profile</div>
            <div >Username</div>
            <div >
                <input type="text" name="username" className="border-primary rounded" value={ newgen.username } onChange={ (e) => { newgenchange({ ...newgen, username: e.target.value }) } } />
            </div>
            <div >Bio</div>
            <div >
                <input type="text" name="about" className="border-primary rounded" value={ newgen.about } onChange={ (e) => { newgenchange({ ...newgen, about: e.target.value }) } } />
            </div>


            <div>
                <div >Profile Image</div>
                <div >
                    <input type="file" name="profile_img"
                        accept="image/png,image/gif,image/jpeg,image/webp" onChange={ (e) => newgenchange({ ...newgen, profile_img: e.target.value }) }  />
                </div>
            </div>
            <div>
                <div >Background Image</div>
                <div >
                    <input type="file" name="background_img"
                        accept="image/png,image/gif,image/jpeg,image/webp"  onChange={ (e) => newgenchange({ ...newgen, background_img: e.target.value }) }  />
                </div>
            </div>

            {/* <div >Institute</div>
            <div >
                <input type="text" className="border-primary rounded" value={newgen.institute.name}  onChange={ (e) => { newgenchange({ ...newgen, institute: { ...newgen.institute, name: e.target.value } }) } } />
            </div> */}

            {/* <div >Institute Logo</div>
            <div >
                <input type="file" name="institute_logo_img"
                    accept="image/png,image/gif,image/jpeg,image/webp" onChange={ (e) => { newgenchange({ ...newgen, institute: { ...newgen.institute, img: e.target.value } }) } }  />
            </div> */}




            <div className="mt-2">
                <button className="btn btn-success float-left" onClick={ () => change_edit_flag(1) }>Cancel</button>
                <button className="btn btn-success float-end" onClick={(e)=> check_and_add(e) }>Add</button>
            </div>
        </div>



    )
}