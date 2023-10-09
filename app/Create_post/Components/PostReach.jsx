import styles from "../CSS/createPost.module.css";
import { Dropdown } from 'react-bootstrap';
import { DropdownToggle, DropdownItem, DropdownMenu } from "react-bootstrap";
import PostReachList from "./PostReachList"


export default function PostReach({ post_types }) {

    return (



        <div className="mt-3 float-end">

            <Dropdown>
                < DropdownToggle
                    variant="success" id="dropdown-basic">
                    Dropdown Button
                </DropdownToggle>

                <DropdownMenu>
                    { post_types.map(post => <DropdownItem ><PostReachList name={ post } /></DropdownItem>) }

                </DropdownMenu>
            </Dropdown>

        </div>
    );
}