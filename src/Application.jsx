import './Application.css'
import './EntryCard.css'
import './DeleteEntryModal.css'
import TimelineGrid from "./TimelineGrid.jsx";
import EntryCard from "./EntryCard.jsx";
import DeleteEntryModal from "./DeleteEntryModal.jsx";
import {useState, createContext, useEffect} from "react";

export const EntryCardContext = createContext({
    idValue: "hidden",
    setIdValue: () => {},
    keyValue: 0,
    setKeyValue: () => {},
    deleteState: false,
    setDeleteState: () => {},
});

function Application() {
    const size = 25;
    const [idValue, setIdValue] = useState("hidden"); // ID for entry card
    const [keyValue, setKeyValue] = useState(0);
    const [selectGridItemKey, setSelectGridItemKey] = useState(null);
    const [deleteState, setDeleteState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);

    // Delete timeline entry logic
    useEffect(() => {
        const onDeleteIsDown = (event) => {
            // keyCode 8 refers to shift key, metakey = cmd, ctrlkey = ctrl.
            if (event.keyCode === 16 && (event.metaKey || event.ctrlKey) && selectGridItemKey){
                setDeleteModalState(true);
            }
        };

        window.addEventListener('keydown', onDeleteIsDown);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', onDeleteIsDown);
        };
    }, [selectGridItemKey]);

    const confirmDelete = (confirmDeletion) => {
        if (confirmDeletion){
            setDeleteState(true);
        }

        setDeleteModalState(false);
    };
    // End of delete timeline entry logic

    return (
        <>
            <EntryCardContext.Provider value={{idValue, setIdValue, keyValue, setKeyValue, deleteState, setDeleteState}}>
                <TimelineGrid size={size}
                              selectGridItemKey={selectGridItemKey}
                              setSelectGridItemKey={setSelectGridItemKey}/>
                <EntryCard size={size}/>
            </EntryCardContext.Provider>
            <DeleteEntryModal deleteModalState={deleteModalState} onClickDeleteLogic={confirmDelete}/>
        </>
    );
}

export default Application