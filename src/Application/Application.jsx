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
    const [connectSpecificEntries, setConnectSpecificEntries] = useState(new Map());
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
        const createEmptyLinePath = () => {return {left: false, right: false, up: false, down: false}};

        // For left-right, the x changes towards coordTwo.x, y is constant with coordOne.y
        // so gridKey = (coordOne.x + i) + (coordOne.y * Math.sqrt(size)) + 1
        // left-right
        for (let i = 0; Math.abs(i) < Math.abs(horizontalDist); (moveLeft) ? i-- : i++){
            // We have a +1 because the do entryKey - 1 in gridKeyToCoord.
            const gridKey = (coordOne.x + i) + (coordOne.y * Math.sqrt(size)) + 1;

            if (!path.has(gridKey)){
                path.set(gridKey, createEmptyLinePath());
            }

            if (moveLeft){
                if (!path.has(gridKey - 1)){
                    path.set(gridKey - 1, createEmptyLinePath());
                }

                path.get(gridKey).left = true;
                path.get(gridKey - 1).right = true;
            }else{
                if (!path.has(gridKey + 1)){
                    path.set(gridKey + 1, createEmptyLinePath());
                }

                path.get(gridKey).right = true;
                path.get(gridKey + 1).left = true;
            }
        }

        // up-down
        // gridKey = coordTwo.x + (coordOne.y + i) * Math.sqrt(size) + 1
        // For up-down, the y changes towards coordTwo.y, x is constant with coordTwo.x
        for (let i = 0; Math.abs(i) < Math.abs(verticalDist); (moveUp) ? i-- : i++){
            const gridKey = coordTwo.x + ((coordOne.y + i) * Math.sqrt(size)) + 1;
            const offset = Math.sqrt(size);

            if (!path.has(gridKey)){
                path.set(gridKey, createEmptyLinePath());
            }

            if (moveUp){
                if (!path.has(gridKey - offset)){
                    path.set(gridKey - offset, createEmptyLinePath());
                }

                path.get(gridKey).up = true;
                path.get(gridKey - offset).down = true;
            }else{
                if (!path.has(gridKey + offset)){
                    path.set(gridKey + offset, createEmptyLinePath());
                }

                path.get(gridKey).down = true;
                path.get(gridKey + offset).up = true;
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

    // currentConnections is a map, whose keys are gridKeys,
    // and values is an object containing left, right, up, down boolean states.
    //
    // newConnections should be an array of maps, whose keys are gridKeys,
    // and values are objects containing the stateConnectedTo and the path.
    const updateEntries = (currentConnections, newConnections) => {
        for (const [gridkey, arrOfConnections] of newConnections.entries()){
            // arrOfConnections is an array of objects which contain the path map too.
            for (const connection of arrOfConnections){

                for (const [key, value] of connection.path.entries()){
                    if (!currentConnections.has(key)){
                        currentConnections.set(key, value); // verify currentConnections contains left, right, ... for this key.
                    }
                    currentConnections.get(key).left |= value.left;
                    currentConnections.get(key).right |= value.right;
                    currentConnections.get(key).up |= value.up;
                    currentConnections.get(key).down |= value.down;
                }
            }
        }
        return currentConnections;
    };

    useEffect(() => {
        if (connectState.second && currentView === "connect-mode"){
            const newConnectEntries = new Map(connectSpecificEntries);
            const minEntryKey = Math.min(connectState.first, connectState.second);
            const maxEntryKey = Math.max(connectState.first, connectState.second);
            const path = createConnectivePath(minEntryKey, maxEntryKey);

            if (!newConnectEntries.has(minEntryKey)){
                newConnectEntries.set(minEntryKey, []);
            }
            if (!newConnectEntries.has(maxEntryKey)){
                newConnectEntries.set(maxEntryKey, []);
            }
            newConnectEntries.get(minEntryKey).push({stateConnectedTo: maxEntryKey, path: path});
            newConnectEntries.get(maxEntryKey).push({stateConnectedTo: minEntryKey, path: path});

            setConnectSpecificEntries(newConnectEntries);
            setConnectEntries(updateEntries(new Map(connectEntries), newConnectEntries));
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