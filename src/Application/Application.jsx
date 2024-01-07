import TimelineGrid from "../TimelineGrid/TimelineGrid.jsx";
import EntryCard from "../EntryCard/EntryCard.jsx";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal.jsx";
import SideBar from "../EntryCard/Sidebar.jsx";
import {useState, createContext, useEffect} from "react";
import Header from "../Header/Header.jsx";
import useDeleteEntryLogic from "../DeleteEntryModal/useDeleteEntryLogic.js"
import useConnectEntriesLogic from "../ConnectEntry/useConnectEntriesLogic.js";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

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
    connectState: null,
    setConnectState: null,
});

function Application() {
    const size = 45; // Timeline grid size
    const [visibilityValue, setVisibilityValue] = useState("hidden"); // ID for entry card component visibility
    const [keyValue, setKeyValue] = useState(0); // Entry card key value to be accessed
    const [selectGridItemKey, setSelectGridItemKey] = useState(null); // Currently selected entry's key
    const [isSelected, setIsSelected] = useState(false); // True if any entry is selected
    const [currentView, setCurrentView] = useState("edit-mode"); // Contains the current view

    const {deleteState, setDeleteState,
        deleteModalState, confirmDelete} = useDeleteEntryLogic(currentView, isSelected);
    const {connectState, setConnectState, connectSpecificEntries,
        connectEntries} = useConnectEntriesLogic(size, currentView);


    return (
        <>
            {/* Header Region */}
            <div className="fill-container">
                <Header currentView={currentView} setCurrentView={setCurrentView}/>
            </div>


            {/* Main Content Region */}
            <div id={"timeline-wrapper"}>
                <EntryCardContext.Provider value={{visibilityValue, setVisibilityValue, keyValue, setKeyValue,
                    isSelected, setIsSelected, deleteState, setDeleteState, currentView, connectState, setConnectState}}>
                    <div className="fill-container"></div>

                    <div className={"timeline-content"}>
                            <TransformWrapper options={{ limitToBounds: false, centerContent: false, centerOnInit: false, initialScale: 1,
                                                  minScale: 0.5,
                                                  maxScale: 2}}>
                                <TransformComponent wrapperClass={""}>
                                    <TimelineGrid size={size}
                                                  selectGridItemKey={selectGridItemKey}
                                                  setSelectGridItemKey={setSelectGridItemKey}
                                                  connectEntries={connectEntries}/>
                                </TransformComponent>
                            </TransformWrapper>
                    </div>


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