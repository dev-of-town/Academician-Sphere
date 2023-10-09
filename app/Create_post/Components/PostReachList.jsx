
import styles from  "../CSS/createPost.module.css";

function clicker(name)
{
    console.log("I am clicked",name);
}

export default function PostReachList({name})
{
    return(
        <li onclick={clicker(name)}>
        <div className="d-flex ps-3">
            <input className={`{styles.sub_photo} align-self-center`} id="id1" name="intent" type="radio"  checked />
            <div className={styles.cname_nom}>
                <label for="id1" className={styles.cname}>
                    {name}
                </label>
                
            </div>
            </div>
    </li>
    )
}