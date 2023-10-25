"use client"
import React, { useEffect } from 'react'

const OnlyForScroll = () => {

    useEffect(()=>{
        window.addEventListener("scroll",(event)=>{
            let communityAbout = document.querySelector("#communityAbout");
            let templateImage = document.querySelector("#templateimage");
            // console.log(communityAbout.offsetTop,window.scrollY,templateImage.scrollHeight);
            if(window.scrollY>communityAbout.offsetTop||0){
                communityAbout.classList.add("fixed55px");
            }
            if(window.scrollY<=templateImage.scrollHeight){
                communityAbout.classList.remove("fixed55px");
            }
        });
    },[]);
  return (
    <div style={{height:'0px'}}></div>
  )
}

export default OnlyForScroll