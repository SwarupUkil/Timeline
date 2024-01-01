import './Application.css'
import './EntryCard.css'
import './DeleteEntryModal.css'
import TimelineGrid from "./TimelineGrid.jsx";
import EntryCard from "./EntryCard.jsx";
import DeleteEntryModal from "./DeleteEntryModal.jsx";
import SideBar from "./Sidebar.jsx";
import {useState, createContext, useEffect} from "react";

export const EntryCardContext = createContext({
    visibilityValue: "hidden",
    setVisibilityValue: () => {},
    keyValue: 0,
    setKeyValue: () => {},
    isSelected: false,
    setIsSelected: () => {},
    deleteState: false,
    setDeleteState: () => {},
});

function Application() {
    const size = 25;
    const [visibilityValue, setVisibilityValue] = useState("hidden"); // ID for entry card component visibility
    const [keyValue, setKeyValue] = useState(0);
    const [selectGridItemKey, setSelectGridItemKey] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);

    // Delete timeline entry logic
    useEffect(() => {
        const onDeleteIsDown = (event) => {
            // keyCode 8 refers to shift key, metakey = cmd, ctrlkey = ctrl.
            if (event.keyCode === 16 && (event.metaKey || event.ctrlKey) && isSelected){
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
            <EntryCardContext.Provider value={{visibilityValue, setVisibilityValue, keyValue, setKeyValue,
                isSelected, setIsSelected, deleteState, setDeleteState}}>
                <div className="fill-container"></div>
                <TimelineGrid size={size}
                              selectGridItemKey={selectGridItemKey}
                              setSelectGridItemKey={setSelectGridItemKey}/>
                <div className="fill-container">
                    <EntryCard size={size}/>
                    <SideBar/>
                </div>
            </EntryCardContext.Provider>

            <DeleteEntryModal deleteModalState={deleteModalState} onClickDeleteLogic={confirmDelete}/>
        </>
    );
}

export default Application