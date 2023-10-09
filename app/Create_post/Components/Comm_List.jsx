import styles from "../CSS/createPost.module.css";
import { Dropdown } from 'react-bootstrap';
import { DropdownToggle, DropdownItem, DropdownMenu } from "react-bootstrap";
import CommunityComp from "./CommunityComp";

export default function Comm_List({ communities }) {

    return (



        <div className="mt-3 float-end">

            <Dropdown>
                < DropdownToggle
                    variant="success" id="dropdown-basic">
                    Dropdown Button
                </DropdownToggle>

                <DropdownMenu>
                <DropdownItem className="ms-2">
                <b>
                    Communities
                </b>
            </DropdownItem>
                    { communities.map(post => <DropdownItem ><CommunityComp {...post} /></DropdownItem>) }

                </DropdownMenu>
            </Dropdown>

        </div>
    );
}