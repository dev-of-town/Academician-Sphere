import React from 'react'

const CommentForm = () => {
  return (
    <div className={styles.container}>
        <form>
            <textarea rows={5} cols={100} className={styles.writecomment}>
            </textarea>
        </form>
    </div>
  )
}

export default CommentForm