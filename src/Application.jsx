import './Application.css'
import './EntryCard.css'
import TimelineGrid from "./TimelineGrid.jsx";
import EntryCard from "./EntryCard.jsx";
import {useState, createContext, useEffect} from "react";
import DeleteEntryModal from "./DeleteEntryModal.jsx";

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
    const [deleteState, setDeleteState] = useState(false);
    // const [deleteModalState, setDeleteModalState] = useState(false);

    // Delete timeline entry logic
    useEffect(() => {
        const onDeleteIsDown = (event) => {
            if (event.key === "Delete"){
                // setDeleteModalState(true);
                //
                // so I make a clear data state,
                // when true then change AddState in TimelineGrid to false,
                // and in EntryCard, make all states become default.
                // Have both then set DeleteState = false;

                // First lets make the modal that popups on select + delete.
                // Add a yes and no button.
            }
        };

        window.addEventListener('keydown', onDeleteIsDown);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', onDeleteIsDown);
        };
    }, []);

    // const confirmDelete = (confirmDeletion) => {
    //     if (confirmDeletion){
    //         setDeleteState(true);
    //     }
    //
    //     setDeleteModalState(false);
    // };
    // End of delete timeline entry logic

    return (
        <>
            <EntryCardContext.Provider value={{idValue, setIdValue, keyValue, setKeyValue, deleteState, setDeleteState}}>
                <TimelineGrid size={size}/>
                <EntryCard size={size}/>
            </EntryCardContext.Provider>
            {/*<DeleteEntryModal deleteModalState={deleteModalState} onClickDeleteLogic={confirmDelete}/>*/}
        </>
    );
}

export default Application