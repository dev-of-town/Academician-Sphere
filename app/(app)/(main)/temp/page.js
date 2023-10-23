"use client"
import React from 'react'
import ImageUploader from '../_components/ImageUploader'
import SendDataButton from '../_components/SendDataButton';

const page = () => {
    const data = new FormData();
  return (
    <div>
        <ImageUploader imageData={data}/>
        <SendDataButton data={data} url={"http://localhost:4041/new-post"}>
            send
        </SendDataButton>
    </div>
  )
}

export default page