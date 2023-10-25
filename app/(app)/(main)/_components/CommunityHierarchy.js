import React, { useState } from "react";
import CreateCommunityCard from "./CreateCommunityCard";
import useNode from "../_hooks/useNode";

const CommunityHierarchy = ({ community,communityNameRef }) => {

  const [communityData, setCommunityData] = useState(community);

  const { insertNode, deleteNode, editNode } = useNode();

  const handleInsertNode = (parentId) => {
    const finalStructure = insertNode(communityData, parentId);
    setCommunityData(finalStructure);
    community = communityData;
    console.log(communityData);
  };

  const handleEditNode = (id, c) => {
    const finalStructure = editNode(communityData, id, c);
    community = finalStructure;
    console.log(communityData);
  };

  const handleDeleteNode = (id) => {
    const finalStructure = deleteNode(communityData, id);
    const temp = { ...finalStructure };
    setCommunityData(temp);
    community = temp;
    console.log(communityData);
  };

  let allRef = [];

  return (
    <>
      <CreateCommunityCard
        isRoot={true}
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        communityNameRef={communityNameRef}
        handleEditNode={handleEditNode}
        community={communityData}
        allRef={allRef}
      />
    </>
  );
};

export default CommunityHierarchy;
