import Image from 'next/image'
import React from 'react'

const Bookmark = () => {
  return (
    <>
        <button>
            <Image src={"/bookmark.svg"} width={30} height={30}/>
        </button>
    </>
  )
}

export default Bookmark