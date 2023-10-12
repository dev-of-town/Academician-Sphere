
import styles from  "../CSS/createPost.module.css";

function clicker(name="whatever")
{
    console.log("I am clicked",name);
}

export default function CommunityComp({name,nom,crt_post,changeCon})
{
    return(
        <li onClick={
            (e)=>
            {
                //e.preventDefault()
            changeCon({...crt_post,comm:name})}}>
        <a className="d-flex text-decoration-none " href="#" >
                    <img className="sub_photo align-self-center" src="pic2.jpg"/>
                    <div className={styles.cname_nom}>
                        <div className={styles.cname}>
                            {name}
                        </div>
                        <div className={styles.nom}>
                            {nom} members
                        </div>
                    </div>
                </a>
    </li>
    )
}