const useTraverseTree = () => {
    function insertNode(tree, folderId, item, isFolder) {
        if(tree.id === folderId && tree.isFolder) {

            //opposite of shit, adds element as first element in array
            
            tree.items.unshift({
                id: new Date().getTime(),
                name: item,
                isFolder,
                items: []
            })
            return tree;
        }

        //Depth first search
        //For adding to child levels

        let latestNode = [];
        latestNode = tree.items.map((ob) => {
            return insertNode(ob, folderId, item, isFolder);
        })

        return {
            ...tree, items: latestNode
        }
        
    }

    return {
        insertNode
    }
}

export default useTraverseTree;
