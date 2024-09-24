import { useState } from "react";

const Folder = ({explorer, handleInsertNode}) => {
    console.log(explorer);
    const [hidden, setHidden] = useState(false);
    const [showInput, setShowInput] = useState({
        isFolder: null,
        visible: false,
    })

    const onAddHandler = (e, isFolder) => {
        setHidden(true);
        setShowInput({
            visible: true,
            isFolder
        })
    }

    const onAddFolder = (e) => {
        if(e.keyCode ===13 && e.target.value) {
            handleInsertNode(explorer.id, e.target.value, showInput.isFolder)
            setShowInput({
                ...showInput,
                visible: false
            })
        }
    }

    if(explorer.isFolder) { 
    return (
        <div className="wrapper">
            <div className="folder">
                <span onClick={() => setHidden(!hidden)}>🗂️ {explorer.name}</span>
                <div className="btn-wrapper">
                    <button onClick={(e) => onAddHandler(e, true)}>Folder +</button>
                    <button onClick={(e) => onAddHandler(e, false)}>File +</button>
                </div>
            </div>
            {
                showInput.visible && (
                    <div className="add-folder">
                        <span>{showInput.isFolder ? "🗂️" : "📁"}</span>
                        <input type="text" autoFocus onKeyDown={(e) => onAddFolder(e)} onBlur={() => setShowInput({...showInput, visible: false})}/>
                    </div>
                    
                )
            }
            {hidden && <div className="files">
            {
                explorer.items.map((exp) => {
                    
                    return (
                        <Folder explorer={exp} key={exp.id} handleInsertNode={handleInsertNode}/>
                    )
                })
            }
            </div>}
        </div>
    ) } else {
        return <span>📁 {explorer.name}</span>
    }
}

export default Folder;