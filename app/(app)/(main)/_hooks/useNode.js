const useNode = () => {
  const insertNode = function (tree, parentId) {
    if(tree.id===parentId){
        tree.subCommunities.push({
          id:new Date().getTime(),
          name:"",
          description:"",
          subCommunities:[],
          users:[]
        })
        return {...tree};
    }

    let newNode = [];
    newNode = tree.subCommunities.map((comm)=>{
        return insertNode(comm,parentId);
    });

    return {...tree};

  };

  const editNode = (tree, communityId, community) => {
    if (tree.id === communityId) {
      tree.name = community.name;
      tree.description = community.description;
      tree.users = community.users;
      return tree;
    }

    tree.subCommunities.map((ob) => {
      return editNode(ob, communityId, community);
    });

    return tree;
  };

  const deleteNode = (tree, id) => {
    for (let i = 0; i < tree.subCommunities.length; i++) {
      const currentItem = tree.subCommunities[i];
      if (currentItem.id === id) {
        tree.subCommunities.splice(i, 1);
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
