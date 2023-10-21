import styles from "../_css/createPost.module.css";
import { Dropdown } from 'react-bootstrap';
import { DropdownToggle, DropdownItem, DropdownMenu } from "react-bootstrap";
import CommunityComp from "./CommunityComp";

export default function Comm_List({ communities,crt_post,changeCon }) {

    return (



        <div className="mt-3 float-end">

            <Dropdown>
                < DropdownToggle
                    variant="success" id="dropdown-basic">
                    {crt_post.community[0]}
                </DropdownToggle>

                <DropdownMenu>
                <DropdownItem className="ms-2">
                <b>
                    Communities
                </b>
            </DropdownItem>
                    { communities.map(post => <DropdownItem ><CommunityComp comm_name={post} crt_post={crt_post} changeCon={changeCon} /></DropdownItem>) }

                </DropdownMenu>
            </Dropdown>

        </div>
    );
}