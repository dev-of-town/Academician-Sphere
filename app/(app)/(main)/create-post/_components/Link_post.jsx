
import styles from "../_css/createPost.module.css";

export default function Link_post({crt_post,changeCon})

{

return(
    <textarea id="ta2" placeholder="Link" className="m-3 border border-2 ps-3 " style={ { width: "95%", borderRadius: "4px",color:"blue",textDecoration:"underline" } }
    onChange={(event)=>changeCon({...crt_post,res_link:event.target.value})}
    value={crt_post.res_link}               
    ></textarea>
)

}