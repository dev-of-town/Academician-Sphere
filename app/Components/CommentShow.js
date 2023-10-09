import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from '../styles/CommentShow.module.css'


const CommentShow = ({comments}) => {
  return (
    <>
        <Link className={styles.container} href={"/"}>
            <Image src={"/comment.png"} width={25} height={25}/>
            {comments}
        </Link>
    </>
  )
}

export default CommentShow