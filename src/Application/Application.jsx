import TimelineGrid from "../TimelineGrid/TimelineGrid.jsx";
import EntryCard from "../EntryCard/EntryCard.jsx";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal.jsx";
import SideBar from "../EntryCard/Sidebar.jsx";
import {useState, createContext, useEffect, useRef} from "react";
import Header from "../Header/Header.jsx";
import useDeleteEntryLogic from "../DeleteEntryModal/useDeleteEntryLogic.js"
import useConnectEntriesLogic from "../ConnectEntry/useConnectEntriesLogic.js";
import {TransformWrapper, TransformComponent, useTransformEffect} from "react-zoom-pan-pinch";
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
    connectSpecificEntries: new Map(),

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
    const transformWrapperRef = useRef(null);
    const [scale, setScale] = useState({minScale: 0.5, maxScale: 2});
    const [position, setPosition] = useState({x: 0, y:0});

    useEffect(() => {
        const zoomAmount = 1;
        transformWrapperRef.current.setTransform(position.x, position.y, zoomAmount)

        const newScale = {};
        newScale.minScale = currentView === "connect-mode" ? 1 : 0.5;
        newScale.maxScale = currentView === "connect-mode" ? 1 : 2;
        setScale(newScale);
    }, [currentView]);

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
                    isSelected, setIsSelected, deleteState, setDeleteState, currentView, connectState, setConnectState, connectSpecificEntries,
                    entryIdCounter, setEntryIdCounter, entryNumbers, setEntryNumbers, selectedEntryId, setSelectedEntryId, setDisableDrag}}>
                    <div className="fill-container"></div>

                    <DndProvider backend={HTML5Backend}>
                        <div className={"timeline-content"}>
                                <TransformWrapper ref={transformWrapperRef}
                                                  disabled={disableDrag}
                                                  minScale={scale.minScale}
                                                  maxScale={scale.maxScale}
                                                  initialScale={1}
                                                  limitToBounds={false}
                                                  centerContent={false}>
                                    <TransformComponent>
                                        <TimelineGrid size={size}
                                                      selectGridItemKey={selectGridItemKey}
                                                      setSelectGridItemKey={setSelectGridItemKey}
                                                      connectEntries={connectEntries}
                                                      setPosition={setPosition}/>
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