import TimelineGrid from "../TimelineGrid/TimelineGrid.jsx";
import EntryCard from "../EntryCard/EntryCard.jsx";
import DeleteEntryModal from "../DeleteEntryModal/DeleteEntryModal.jsx";
import SideBar from "../EntryCard/Sidebar.jsx";
import {useState, createContext, useEffect} from "react";
import Header from "../Header/Header.jsx";
import useDeleteEntryLogic from "../DeleteEntryModal/useDeleteEntryLogic.js"

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
    const size = 25; // Timeline grid size
    const [visibilityValue, setVisibilityValue] = useState("hidden"); // ID for entry card component visibility
    const [keyValue, setKeyValue] = useState(0); // Entry card key value to be accessed
    const [selectGridItemKey, setSelectGridItemKey] = useState(null); // Currently selected entry's key
    const [isSelected, setIsSelected] = useState(false); // True if any entry is selected
    const [currentView, setCurrentView] = useState("edit-mode"); // Contains the current view
    const {deleteState, setDeleteState,
        deleteModalState, confirmDelete} = useDeleteEntryLogic(currentView, isSelected);

    // Connect logic begin
    const [connectState, setConnectState] = useState({first: null, second: null});
    const [connectEntries, setConnectEntries] = useState(new Map());

    const gridKeyToCoord = (entryKey) => {
        const index = entryKey - 1;
        const x = index % (Math.sqrt(size));
        const y = Math.floor(index / Math.sqrt(size));
        return {x: x, y: y};
    };
    const generatePath = (coordOne, coordTwo) => {
        // each key will have an array of classes for left, right, up, down
        const horizontalDist = coordTwo.x - coordOne.x;
        const verticalDist = coordTwo.y - coordOne.y;
        const moveLeft = horizontalDist < 0;
        const moveUp = verticalDist < 0;
        const path = new Map(); // map contains values 1-25 with an array of strings for up/down,left/right.

        // For left-right, the x changes towards coordTwo.x, y is constant with coordOne.y
        // so gridKey = (coordOne.x + i) + (coordOne.y * Math.sqrt(size)) + 1
        // left-right
        for (let i = 0; Math.abs(i) < Math.abs(horizontalDist); (moveLeft) ? i-- : i++){
            // We have a +1 because the do entryKey - 1 in gridKeyToCoord.
            const gridKey = (coordOne.x + i) + (coordOne.y * Math.sqrt(size)) + 1;

            if (!path.has(gridKey)){
                path.set(gridKey, []);
            }

            if (moveLeft){
                if (!path.has(gridKey - 1)){
                    path.set(gridKey - 1, []);
                }

                path.get(gridKey).push("left");
                path.get(gridKey - 1).push("right");
            }else{
                if (!path.has(gridKey + 1)){
                    path.set(gridKey + 1, []);
                }

                path.get(gridKey).push("right");
                path.get(gridKey + 1).push("left");
            }
        }

        // up-down
        // gridKey = coordTwo.x + (coordOne.y + i) * Math.sqrt(size) + 1
        // For up-down, the y changes towards coordTwo.y, x is constant with coordTwo.x
        for (let i = 0; Math.abs(i) < Math.abs(verticalDist); (moveUp) ? i-- : i++){
            const gridKey = coordTwo.x + ((coordOne.y + i) * Math.sqrt(size)) + 1;
            const offset = Math.sqrt(size);

            if (!path.has(gridKey)){
                path.set(gridKey, []);
            }

            if (moveUp){
                if (!path.has(gridKey - offset)){
                    path.set(gridKey - offset, []);
                }

                path.get(gridKey).push("up");
                path.get(gridKey - offset).push("down");
            }else{
                if (!path.has(gridKey + offset)){
                    path.set(gridKey + offset, []);
                }

                path.get(gridKey).push("down");
                path.get(gridKey + offset).push("up");
            }
        }

        return path;
    };

    // Assume entryOne < entryTwo
    const createConnectivePath = (entryOneKey, entryTwoKey) => {
        const coordOne = gridKeyToCoord(entryOneKey);
        const coordTwo = gridKeyToCoord(entryTwoKey);
        console.log(generatePath(coordOne, coordTwo));
        return generatePath(coordOne, coordTwo);
    };

    useEffect(() => {
        if (connectState.second && currentView === "connect-mode"){
            const newConnectEntries = new Map(connectEntries);
            const minEntryKey = Math.min(connectState.first, connectState.second);
            const maxEntryKey = Math.max(connectState.first, connectState.second);
            newConnectEntries.set({first : minEntryKey, second: maxEntryKey},
                createConnectivePath(minEntryKey, maxEntryKey));

            // setConnectEntries(newConnectEntries);
            setConnectEntries(createConnectivePath(minEntryKey, maxEntryKey))
            setConnectState({first: null, second: null});
        }
    }, [connectState]);
    // Connect logic end

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
                    <TimelineGrid size={size}
                                  selectGridItemKey={selectGridItemKey}
                                  setSelectGridItemKey={setSelectGridItemKey}
                                  connectEntries={connectEntries}/>
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