import './Application.css'
import './Header.css'
import './EntryCard.css'
import './DeleteEntryModal.css'
import TimelineGrid from "./TimelineGrid.jsx";
import EntryCard from "./EntryCard.jsx";
import DeleteEntryModal from "./DeleteEntryModal.jsx";
import SideBar from "./Sidebar.jsx";
import {useState, createContext, useEffect} from "react";
import Header from "./Header.jsx";

export const EntryCardContext = createContext({
    visibilityValue: "hidden",
    setVisibilityValue: () => {},
    keyValue: 0,
    setKeyValue: () => {},
    isSelected: false,
    setIsSelected: () => {},
    deleteState: false,
    setDeleteState: () => {},
    currentView: "edit-mode",
});

function Application() {
    const size = 25; // Timeline grid size
    const [visibilityValue, setVisibilityValue] = useState("hidden"); // ID for entry card component visibility
    const [keyValue, setKeyValue] = useState(0); // Entry card key value to be accessed
    const [selectGridItemKey, setSelectGridItemKey] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const [deleteState, setDeleteState] = useState(false);
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [currentView, setCurrentView] = useState("edit-mode");

    // Delete timeline entry logic
    useEffect(() => {
        const onDeleteIsDown = (event) => {
            // keyCode 8 refers to shift key, metakey = cmd, ctrlkey = ctrl.
            if ((currentView === "edit-mode") && (event.keyCode === 16) && (event.metaKey || event.ctrlKey) && isSelected){
                setDeleteModalState(true);
            }
        };

        window.addEventListener('keydown', onDeleteIsDown);

        // Cleanup
        return () => {
            window.removeEventListener('keydown', onDeleteIsDown);
        };
    }, [selectGridItemKey, currentView]);

    const confirmDelete = (confirmDeletion) => {
        if (confirmDeletion){
            setDeleteState(true);
        }

        setDeleteModalState(false);
    };
    // End of delete timeline entry logic




    return (
        <>
            {/* Header Region*/}
            <div className="fill-container">
                {/*<div id={"root-header"}>*/}
                {/*    <button className={"modal-button" + " " + (currentView === "view-mode" ? "view-select" : "")}*/}
                {/*            onClick={changeView("view-mode")}>View</button>*/}
                {/*    <button className={"modal-button" + " " + (currentView === "edit-mode" ? "view-select" : "")}*/}
                {/*            onClick={changeView("edit-mode")}>Edit</button>*/}
                {/*    <button className={"modal-button" + " " + (currentView === "connect-mode" ? "view-select" : "")}*/}
                {/*            onClick={changeView("connect-mode")}>Connect</button>*/}
                {/*</div>*/}
                <Header currentView={currentView} setCurrentView={setCurrentView}/>
            </div>


            {/* Main Content Region */}
            <div id={"root-content"}>
                <EntryCardContext.Provider value={{visibilityValue, setVisibilityValue, keyValue, setKeyValue,
                    isSelected, setIsSelected, deleteState, setDeleteState, currentView}}>
                    <div className="fill-container"></div>
                    <TimelineGrid size={size}
                                  selectGridItemKey={selectGridItemKey}
                                  setSelectGridItemKey={setSelectGridItemKey}/>
                    <div className="fill-container">
                        <EntryCard size={size}/>
                        <SideBar/>
                    </div>
                </EntryCardContext.Provider>
            </div>


            {/* Footer Region */}
            <div className="fill-container"></div>


            <DeleteEntryModal deleteModalState={deleteModalState} onClickDeleteLogic={confirmDelete}/>
        </>
    );
}

export default Application