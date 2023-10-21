import Image from 'next/image'
import React from 'react'
import styles from '../_styles/CreatePostButton.module.css'
import Link from 'next/link'

const CreatPostButton = ({img}) => {
  return (
    <Link href={"/"} className={styles.createpostbtn}>
        <div className={styles.profileimg}>
            <Image src={"/msulogo412.png"} width={35} height={35} priority/>
        </div>
        <div>Create A Post</div>
    </Link>
  )
}

export default CreatPostButton