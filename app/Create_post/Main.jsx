import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import styles from "./CSS/createPost.module.css";
import PostReach from "./Components/PostReach";
import Comm_List from "./Components/Comm_List";
const post_types = ["Events", "Placement", "news"]
const communities = [{ "name": "Cricket", "nom": 567 }, { "name": "Cricket", "nom": 567 }, { "name": "Cricket", "nom": 567 }]

export default function Main() {
    return (
        <body className={ `px-5 py-2 ${styles.create_post}` } >
            <div className={ styles.header }>
                <h5>
                    Create a post
                </h5>
                <div className={ `ms-auto ${styles.postCat}` }>
                    <input id="public" name="pub_pri" type="radio" checked />
                    <label for="public">Public&nbsp;&nbsp;&nbsp;</label>
                    <input id="private" name="pub_pri" type="radio" checked />
                    <label for="private">Private</label>

                </div>
                <div>

                </div>
            </div>

            <div className={ styles.line1 }> </div>
            <div className={ styles.dropContainer }>
                <div> <Comm_List communities={ communities } /></div>
                <div> <PostReach post_types={ post_types } /></div>


            </div>


            <div className="bg-white container rounded ">
        <div className={`d-flex mt-3 border-bottom ${styles.typeGp}`} style={{marginLeft: "-10px",marginRight: "-10px"}}>
            <button className={`bg-white border-end py-2 typeTitle ${styles.bor_cur_post_type}`}  >
                <a href="#" style={{color: "black"}}>
                    <span>                    <i className="fa-solid fa-plus border-black border"></i>

                    Post</span>
                </a>
                
            </button>
            <button className={`bg-white border-end py-2 ${styles.typeTitle}`} >
                <a href="#" style={{color: "black"}}>
                    <span>
                        <i className="fa-solid fa-photo-film"></i>

                    Image and video
                    </span>
                </a>
            </button>
            <button className={`bg-white py-2 ${styles.typeTitle}`} >
                <a href="#" style={{color: "black"}}>
                    <span>
                        <i className="fa-solid fa-link"></i>

                    Link
                </span>
                </a>
            </button>
        </div>


        <textarea placeholder="Title" className="m-3 border border-2 ps-3 " id="ta1"
            style={{width: "95%",borderRadius: "4px",overflowX: "hidden",overflowWrap: "break-word",height: "40px"}}
            maxLength="300" rows="1"></textarea>
        <textarea id="ta2" placeholder="Text" className="m-3 border border-2 ps-3 " style={{width: "95%",borderRadius: "4px"}}
            rows="5"></textarea>
        <div id="postFile" className="drag-area m-3"  ondragover="return false" style={{width: "95%",display: "none"}}>
            <div className="icon"><i className="fas fa-cloud-upload-alt"></i></div>
            <div className="text-secondary fw-bold"> Drag & Drop to Upload File</div>
            <div className="text-secondary fw-bold">
                OR
            </div>
            <button>Browse File</button>
            <input type="file" name="file" id="file"
                accept="image/png,image/gif,image/jpeg,image/webp,video/mp4,video/quicktime" hidden/>
        </div>

       

    </div>

        </body>


    )
}