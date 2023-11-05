const useNode = () => {
  const insertNode = function (tree, parentId) {
    if(tree.community_id===parentId){
        tree.sub_communities.push({
          community_id:new Date().getTime(),
          name:"",
          description:"",
          sub_communities:[],
          users:[]
        })
        return {...tree};
    }

    let newNode = [];
    newNode = tree.sub_communities.map((comm)=>{
        return insertNode(comm,parentId);
    });

    return {...tree};

  };

  const editNode = (tree, communityId, community) => {
    if (tree.community_id == communityId) {
      tree.name = community.name;
      tree.description = community.description;
      tree.users = community.users;
      return tree;
    }

    tree.sub_communities.map((ob) => {
      return editNode(ob, communityId, community);
    });

    return tree;
  };

  const deleteNode = (tree, id) => {
    for (let i = 0; i < tree.sub_communities.length; i++) {
      const currentItem = tree.sub_communities[i];
      if (currentItem.community_id === id) {
        tree.sub_communities.splice(i, 1);
        return tree;
      } else {
        deleteNode(currentItem, id);
      }
    }
    return tree;
  };

  return { insertNode, deleteNode, editNode };
};

export default useNode;
