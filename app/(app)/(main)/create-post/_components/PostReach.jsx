import { useState } from "react";
import styles from "../_css/createPost.module.css";
import { Dropdown } from "react-bootstrap";
import { DropdownToggle, DropdownItem, DropdownMenu } from "react-bootstrap";
import PostReachList from "./PostReachList";
const post_types = ["Events", "Placement", "News"];

export default function PostReach({ crt_post, changeCon }) {
  return (
    <div className="mt-3 float-end">
      <Dropdown>
        <DropdownToggle variant="success" id="dropdown-basic">
          {crt_post.category}
        </DropdownToggle>

        <DropdownMenu>
          {post_types.map((post,index) => (
            <DropdownItem key={index}>
              <PostReachList
                name={post}
                crt_post={crt_post}
                changeCon={changeCon}
              />
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
