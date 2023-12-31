import TimelineGrid from "../TimelineGrid/TimelineGrid.jsx";
import EntryCard from "../EntryCard/EntryCard.jsx";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal.jsx";
import SideBar from "../EntryCard/Sidebar.jsx";
import {useState, createContext} from "react";
import Header from "../Header/Header.jsx";
import useDeleteEntryLogic from "../DeleteEntryModal/useDeleteEntryLogic.js"
import useConnectEntriesLogic from "../ConnectEntry/useConnectEntriesLogic.js";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export const EntryCardContext = createContext({
    visibilityValue: "hidden",
    setVisibilityValue: () => {},
    isSelected: false,
    setIsSelected: () => {},

    deleteState: false,
    setDeleteState: () => {},

    currentView: "edit-mode",

    connectState: null,
    setConnectState: null,

    entryIdCounter: 1,
    setEntryIdCounter: () => {},
    entryNumbers: [],
    setEntryNumbers: () => {},
    selectedEntryId: null,
    setSelectedEntryId: () => {},
    setDisableDrag: () => {},
});

function Application() {
    const size = 81; // Timeline grid size
    const [visibilityValue, setVisibilityValue] = useState("hidden"); // ID for entry card component visibility
    const [selectGridItemKey, setSelectGridItemKey] = useState(null); // Currently selected entry's key
    const [isSelected, setIsSelected] = useState(false); // True if any entry is selected
    const [currentView, setCurrentView] = useState("edit-mode"); // Contains the current view

    // delete-entry use case states
    const {deleteState, setDeleteState,
        deleteModalState, confirmDelete} = useDeleteEntryLogic(currentView, isSelected);

    // connect-entry use case states
    const {connectState, setConnectState, connectSpecificEntries,
        connectEntries} = useConnectEntriesLogic(size, currentView);

    // Timeline Entry states
    const [entryIdCounter, setEntryIdCounter] = useState(1); // ID incrementer for each new entry
    const [entryNumbers, setEntryNumbers] = useState([]); // current list of entries active
    const [selectedEntryId, setSelectedEntryId] = useState(1); // ID of entry that is selected
    const [disableDrag, setDisableDrag] = useState(false); // Disables timeline grid panning


    return (
        <>
            {/* Header Region */}
            <div className="fill-container">
                <Header currentView={currentView} setCurrentView={setCurrentView}/>
            </div>


            {/* Main Content Region */}
            <div id={"timeline-wrapper"}>

                <EntryCardContext.Provider value={{visibilityValue, setVisibilityValue,
                    isSelected, setIsSelected, deleteState, setDeleteState, currentView, connectState, setConnectState,
                    entryIdCounter, setEntryIdCounter, entryNumbers, setEntryNumbers, selectedEntryId, setSelectedEntryId, setDisableDrag}}>
                    <div className="fill-container"></div>

                    <DndProvider backend={HTML5Backend}>
                        <div className={"timeline-content"}>
                                <TransformWrapper disabled={disableDrag}
                                                  minScale={0.5}
                                                  maxScale={2}
                                                  initialScale={1}
                                                  limitToBounds={false}
                                                  centerContent={false}>
                                    <TransformComponent wrapperClass={""}>
                                        <TimelineGrid size={size}
                                                      selectGridItemKey={selectGridItemKey}
                                                      setSelectGridItemKey={setSelectGridItemKey}
                                                      connectEntries={connectEntries}/>
                                    </TransformComponent>
                                </TransformWrapper>
                        </div>
                    </DndProvider>


                    <div className="fill-container">
                        <EntryCard/>
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