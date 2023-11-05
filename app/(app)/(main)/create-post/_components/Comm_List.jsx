import styles from "../_css/createPost.module.css";
import { Dropdown } from "react-bootstrap";
import { DropdownToggle, DropdownItem, DropdownMenu } from "react-bootstrap";
import CommunityComp from "./CommunityComp";
import axios from "./axios.jsx";
import { useState, useEffect } from "react";
import Image from "next/image";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare,faSquareCheck} from "@fortawesome/free-solid-svg-icons";


export default function Comm_List({ usercoms ,chUser_comm}) {
    let [user_communities, changeCon] = useState([]);


  // const getCommData = async (cid) => {
  //   try {
  //     console.log("In get method");
  //     const res = await axios.get(`/c/`,crt_post.user_id);
  //     console.log(res.data);
  //     changeCon(user_communities.push({comm : res.data,selected:false}));
  //   } catch (error) {
  //     setIsError(error.message);
  //     console.error("this is error !!!", error.message);
  //   }
  // };

  // const getuserData = async () => {
  //   try {
  //     console.log("In get method, Comm_list");
  //     const res = await axios.get(`/u/`,crt_post.user_id);
  //     console.log(res.data);
  //     res.data.communities.map((cobj) => getCommData(cobj.community_id));
  //   } catch (error) {
  //     setIsError(error.message);
  //     console.error("this is error !!!", error.message);
  //   }
  // };

  useEffect(() => {
    // changeCon([
    //   ...user_communities,
    //   {
    //     comm: { name: "Cricket1", participants: ["h", "h", "l"] },
    //     selected: true,
    //   },
    //   {
    //     comm: { name: "Cricket1", participants: ["h", "h", "l"] },
    //     selected: true,
    //   },
    //   {
    //     comm: { name: "Cricket1", participants: ["h", "h", "l"] },
    //     selected: true,
    //   },
    // ]);
      const id = JSON.parse(localStorage.getItem("user"))._id; 
      let data;
      fetch(`http://localhost:4041/u/${id}/get-following-community`).then(async (res)=>{
        data = await res.json();
        console.log("From",data);
        let coms = data.followingCommunity.map((c)=>{
          c.selected = false;
          return c;
        })
        // console.log(coms);
       // usercoms.coms = [...coms];
       chUser_comm({coms : [...coms]})
        console.log(usercoms,"Hello");
        changeCon([...coms]);
      }).catch((error)=>{
        console.log(error);
      });


  }, []);
  const onClickcheck=(indexi) => {
    //e.preventDefault()
    //console.log("JJJJJ")
    console.log("the clicked", indexi);
    //user_communities[index].selected=!user_communities[index].selected;
    console.log(user_communities,"index",indexi);
    
    
      
   let updateComm = user_communities.map((commu,index) =>
    {
      if(indexi==index)
      {
        return{...commu,selected:!commu.selected};
      }
      else
      return commu;

    }); 

    chUser_comm({coms:[...updateComm]})

    console.log("user coms",usercoms.coms);

    changeCon([...updateComm]);

   // comm.selected = !comm.selected;
    // user_community.selected=!user_community.selected
   // const all_c_temp = user_communities.map(());

  //  all_c_temp[i].selected = !all_c_temp[i].selected;

    // console.log("TEMP ", all_c_temp);
    // console.log("ALL C", all_c_temp);
    //usercoms.coms = [...all_c];
    //changer(all_c_temp);
  }

  return (
    <div className="mt-3 float-end">
      <Dropdown>
        <DropdownToggle variant="success" id="dropdown-basic">
          Select communities
        </DropdownToggle>

        <DropdownMenu>
          <DropdownItem className="ms-2">
            <b>Communities</b>
          </DropdownItem>
          {user_communities.map((comm, index) => (

//console.log(comm,"Comm",index)

            <DropdownItem key={index} onClick={()=>
           onClickcheck(index) }>
              {/* <CommunityComp
                all_c={user_communities}
                changer={changeCon}
                user_community={comm}
                i={index}
                usercoms={usercoms}
                key={index}
              /> */}

<li key={index} 
// onClick={()=>onClickcheck(index)}  
// style={{"backgroundColor":comm.selected?"lightblue":"white"}} 
 >
      <div className="d-flex text-decoration-none">
      {/* <label className="d-flex"> */}
        {/* <input
          type="checkbox"
          id={index}
          value={comm.name}
          checked={comm.selected}
         // defaultChecked={user_communities[index].selected}
          onChange={e=>{
            console.log("I am clicked",comm)
            console.log("Hello guys",e.target.checked);
           // e.target.checked = false;
            
            // .checked=!user_communities[index].selected
            onClickcheck(index,e.target.checked)}}
          // onClick={(e) => {
          //   //e.preventDefault()
          //   console.log("the clicked", index);
          //   // user_community  .selected=!user_community.selected
          //   const all_c_temp = [...all_c];

          //   all_c_temp[i].selected = !all_c_temp[i].selected;

          //   console.log("TEMP ", all_c_temp);
          //   console.log("ALL C", all_c_temp);
          //   usercoms.coms = [...all_c];
          //   changer(all_c_temp);

          // }}
        />
         */}

<button onClick={()=>onClickcheck(index)} >

{comm.selected ?  <FontAwesomeIcon
           icon={faSquareCheck}
           style={{color:"white",backgroundColor:"black"}}
           className="border border-dark"

           
         />
         :
         <FontAwesomeIcon
           icon={faSquare}
           style={{color:"white"}}
           className="border border-dark"
          
         />

}
 </button>


        <span  className="d-flex ms-3">
          <Image
            className="sub_photo align-self-center"
            src={comm.profile_img.url}
            width={25}
            height={25}
            alt={comm.name}
          />
          <div className={styles.cname_nom}>
            <div className={styles.cname}>{comm.name}
            {/* {comm.selected?"True":"False"} */}
            </div>
            {/* <div className={styles.nom}>
              {user_community.participants.length} members
            </div> */}
          </div>
        </span>
       
       
        {/* </label> */}
      </div>
    </li>

            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
