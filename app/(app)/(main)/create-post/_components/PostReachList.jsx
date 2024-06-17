import styles from "../_css/createPost.module.css";

function clicker(name) {
  console.log("I am clicked", name);
}

export default function PostReachList({ name, crt_post, changeCon }) {
  // console.log(crt_post.post_cat,name,crt_post.post_cat==name);

  return (
    <li
      onClick={(e) => {
        //e.preventDefault()
        changeCon({ ...crt_post, category: name });
      }}
    >
      <div className="d-flex ps-3">
       
        <div className={styles.cname_nom}>
          <label htmlFor={name} className={styles.cname }>
            {name}
          </label>
        </div>
      </div>
    </li>
  );
}
