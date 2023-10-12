"use client";
import React, { useState } from "react";

import "bootstrap/dist/css/bootstrap.css";
import styles from "./CSS/createPost.module.css";
import PostReach from "./Components/PostReach";
import Comm_List from "./Components/Comm_List";
import Content_post from "./Components/Content_post";
import Link_post from "./Components/Link_post";
const communities = [{ name: "Cricket", nom: 5687 }, { name: "Cricket1", nom: 567 }, { name: "Cricket2", nom: 5967 }]


export default function Main({ comm }) {

    const [crt_post, changeCon] = useState({
        comm: "Cricket",
        post_type_flag: 1,
        post_content: 1,
        post_cat: 'Events',
        title: "",
        des: "",
        res_link: ""

    })
    console.log("catagory", crt_post.post_cat);


    return (


        <body className={ `px-5 py-2 ${styles.create_post}` } >
            <div className={ styles.header }>
                <h5>
                    Create a post
                </h5>
                <div className={ `ms-auto ${styles.postCat}` }>
                    <input id="public" onClick={ () => changeCon({ ...crt_post, post_type_flag: 1 }) } name="pub_pri" type="radio" checked={ crt_post.post_type_flag == 1 } />
                    <label htmlFor="public">Public&nbsp;&nbsp;&nbsp;</label>
                    <input id="private" onClick={ () => changeCon({ ...crt_post, post_type_flag: 2 }) } name="pub_pri" type="radio" checked={ crt_post.post_type_flag == 2 } />
                    <label htmlFor="private">Private</label>

                </div>
                <div>

                </div>
            </div>

            <div className={ styles.line1 }> </div>
            <div className={ styles.dropContainer }>
                <div> <Comm_List communities={ communities } crt_post={ crt_post } changeCon={ changeCon } /></div>
                <div> <PostReach crt_post={ crt_post } changeCon={ changeCon } /></div>


            </div>


            <div className="bg-white container rounded ">
                <div className={ `d-flex mt-3 border-bottom ${styles.typeGp}` } style={ { marginLeft: "-10px", marginRight: "-10px" } }>
                    <button className={ `bg-white border-end py-2  ${styles.typeTitle, crt_post.post_content === 1 && styles.current}` } onClick={ () => changeCon({ ...crt_post, post_content: 1 }) } >
                        <a href="#" style={ { color: "black" } }>
                            <span>                    <i className="fa-solid fa-plus border-black border"></i>

                                Post</span>
                        </a>

                    </button>
                    <button className={ `bg-white border-end py-2 ${styles.typeTitle, crt_post.post_content === 2 && styles.current}` } onClick={ () => changeCon({ ...crt_post, post_content: 2 }) } >
                        <a href="#" style={ { color: "black" } }>
                            <span>
                                <i className="fa-solid fa-photo-film"></i>

                                Image and video
                            </span>
                        </a>
                    </button>
                    <button className={ `bg-white py-2 ${styles.typeTitle, crt_post.post_content === 3 && styles.current}` } onClick={ () => changeCon({ ...crt_post, post_content: 3 }) }>
                        <a href="#" style={ { color: "black" } }>
                            <span>
                                <i className="fa-solid fa-link"></i>

                                Link
                            </span>
                        </a>
                    </button>
                </div>


                <textarea placeholder="Title" className="m-3 border border-2 ps-3 " id="ta1"
                    onChange={ (event) => changeCon({ ...crt_post, title: event.target.value }) }
                    value={ crt_post.title }
                    style={ { width: "95%", borderRadius: "4px", overflowX: "hidden", overflowWrap: "break-word", height: "40px" } }
                    maxLength="300" rows="1"></textarea>
                <textarea id="ta2"
                    onChange={ (event) => changeCon({ ...crt_post, des: event.target.value }) }
                    value={ crt_post.des }
                    placeholder="Text" className="m-3 border border-2 ps-3 " style={ { width: "95%", borderRadius: "4px" } }
                    rows="5"></textarea>
                { crt_post.post_content === 3 && <Link_post crt_post={ crt_post } changeCon={ changeCon } /> }
                { crt_post.post_content === 2 && <Content_post /> }



            </div>

        </body>


    )
}