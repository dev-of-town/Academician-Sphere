
import styles from  "../_css/createPost.module.css";

function clicker(name="whatever")
{
    console.log("I am clicked",name);
}

export default function CommunityComp({comm_name,crt_post,changeCon})
{
    return(
        <li onClick={
            (e)=>
            {
                //e.preventDefault()
            changeCon({...crt_post,comm_name:name})}}>
        <a className="d-flex text-decoration-none " href="#" >
                    <img className="sub_photo align-self-center" src="pic2.jpg"/>
                    <div className={styles.cname_nom}>
                        <div className={styles.cname}>
                            {comm_name}
                        </div>
                        {/* <div className={styles.nom}>
                            {nom} members
                        </div> */}
                    </div>
                </a>
    </li>
    )
}