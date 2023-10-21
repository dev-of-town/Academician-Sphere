"use client";
import React, { useState } from "react";
import { Montserrat, Playfair_Display } from '@next/font/google'

import "bootstrap/dist/css/bootstrap.css";
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faPhotoFilm,faLink } from '@fortawesome/free-solid-svg-icons'
import styles from "./_css/createPost.module.css";
import PostReach from "./_components/PostReach";
import Comm_List from "./_components/Comm_List";
import Content_post from "./_components/Content_post";
import Link_post from "./_components/Link_post";
import Dropzone from "./_components/Dropper";
const communities = [{ name: "Cricket", nom: 5687 }, { name: "Cricket1", nom: 567 }, { name: "Cricket2", nom: 5967 }]


export default function Main({ comm }) {

    const [crt_post, changeCon] = useState({
        community:["Cricket","Cricket1","Cricket2"],
        sender_id:12,   
        isPublic: true,
        post_content: 1,
        date:new Date(),
        category: 'Events',
        title: "",
        body: "",
        attachments:[],
        upvotes:[],
        downvotes:[],
        comments:[],
        res_link: []

    })
    console.log("catagory", crt_post.category);


    return (


        <div className={ `px-5 py-2 ${styles.create_post}` } >
            <div className={ styles.header }>
                <h5>
                    Create a post
                </h5>
                <div className={ `ms-auto ${styles.postCat}` }>
                    <input id="public" onClick={ () => changeCon({ ...crt_post, isPublic: true }) } name="pub_pri" type="radio" checked={ crt_post.isPublic == true } />
                    <label htmlFor="public">Public&nbsp;&nbsp;&nbsp;</label>
                    <input id="private" onClick={ () => changeCon({ ...crt_post, isPublic: false }) } name="pub_pri" type="radio" checked={ crt_post.isPublic == false } />
                    <label htmlFor="private">Private</label>

                </div>
                <div>

                </div>
            </div>

            <div className={ styles.line1 }> </div>
            <div className={ styles.dropContainer }>
                <div> <Comm_List communities={ crt_post.community } crt_post={ crt_post } changeCon={ changeCon } /></div>
                <div> <PostReach crt_post={ crt_post } changeCon={ changeCon } /></div>


            </div>


            <div className="bg-white container rounded ">
                <div className={ `d-flex mt-3 border-bottom ${styles.typeGp}` } style={ { marginLeft: "-10px", marginRight: "-10px" } }>
                    <button className={ `bg-white border-end py-2  ${styles.typeTitle, crt_post.post_content === 1 && styles.current}` } onClick={ () => changeCon({ ...crt_post, post_content: 1 }) } >
                        <a href="#"  className={crt_post.post_content === 1? styles.hovStyleon:styles.hovStylen}>
                            <span>                   
                            <FontAwesomeIcon icon={faPlus} className="border-black border" />
                             &nbsp;   Post</span>
                        </a>

                    </button>
                    <button className={ `bg-white border-end py-2 ${styles.typeTitle, crt_post.post_content === 2 && styles.current}` } onClick={ () => changeCon({ ...crt_post, post_content: 2 }) } >
                        <a href="#"   className={crt_post.post_content === 2? styles.hovStyleon:styles.hovStylen}>
                            <span>
                            <FontAwesomeIcon icon={faPhotoFilm} />                                Image and video
                            </span>
                        </a>
                    </button>
                    <button className={ `bg-white py-2 ${styles.typeTitle, crt_post.post_content === 3 && styles.current}` } onClick={ () => changeCon({ ...crt_post, post_content: 3 }) }>
                        <a href="#"  className={crt_post.post_content === 3? styles.hovStyleon:styles.hovStylen}>
                            <span>
                            <FontAwesomeIcon icon={faLink} />
                               &nbsp; Link
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
                    onChange={ (event) => changeCon({ ...crt_post, body: event.target.value }) }
                    value={ crt_post.des }
                    placeholder="Text" className="m-3 border border-2 ps-3 " style={ { width: "95%", borderRadius: "4px" } }
                    rows="5"></textarea>
                { crt_post.post_content === 3 && <Link_post crt_post={ crt_post } changeCon={ changeCon } /> }
                { crt_post.post_content === 2 && <Dropzone crt_post={crt_post} changeCon={changeCon}/> }



            </div>
            <div>
                <button className="btn btn-primary float-end m-2" >
                    Upload
                    </button>
            </div>

        </div>


    )
}