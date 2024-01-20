import {useContext, useEffect, useState} from "react";
import {EntryCardContext} from "../Application/Application.jsx";
import TimelineEntry from "./TimelineEntry.jsx";
import PropTypes from "prop-types";
import useDropLogic from "./useDropLogic.js";
import Xarrow from "react-xarrows";

function GridItem({selectGridItemKey, setSelectGridItemKey, gridKey}){

    const [entrySelect, setEntrySelect] = useState(selectGridItemKey === gridKey);
    const {setIsSelected, deleteState, setDeleteState, currentView,
        connectState, setConnectState, connectSpecificEntries, setConnectSpecificEntries,
        entryIdCounter, setEntryIdCounter, entryNumbers, setEntryNumbers, setSelectedEntryId} = useContext(EntryCardContext);

    const {currentEntryNumber, setCurrentEntryNumber, isHovering, gridRef}
        = useDropLogic(setSelectedEntryId, gridKey, setSelectGridItemKey, connectSpecificEntries, setConnectSpecificEntries);


    useEffect(() => {
        const resetSelectState = selectGridItemKey === gridKey;

        // deletes entry
        if (deleteState && resetSelectState){

            // Delete all connections
            const newConnectEntries = new Map(connectSpecificEntries);

            // Remove connection to current entry from other entries
            if (newConnectEntries.has(currentEntryNumber)){
                for (const connectedToEntryNumber of newConnectEntries.get(currentEntryNumber)){
                    const indexOfConnectedToEntryNumber = newConnectEntries.get(connectedToEntryNumber).indexOf(currentEntryNumber);
                    newConnectEntries.get(connectedToEntryNumber).splice(indexOfConnectedToEntryNumber, 1);
                }
            }

            newConnectEntries.set(currentEntryNumber, []);
            setConnectSpecificEntries(newConnectEntries);
            setConnectState({first: null, second: null});


            setEntrySelect(false);
            setDeleteState(false);
            setIsSelected(false);
            setCurrentEntryNumber(null);
        }else{
            setEntrySelect(resetSelectState);
        }
    }, [deleteState, selectGridItemKey]);

    const onEntryClick = (entrySelected, currentEntryNumber) => () => {
        const nextEntryAdd = (currentView === "edit-mode") ? (!!currentEntryNumber || !entrySelected) : !!currentEntryNumber;
        const nextEntrySelect = (currentView === "edit-mode" || nextEntryAdd) ? !entrySelected : false;
        setEntrySelect(nextEntrySelect);

        // Whether an entry is selected logic
        if (nextEntrySelect) {
            setSelectGridItemKey(gridKey);
            if (!currentEntryNumber){ // required otherwise we could erroneously set SelectedEntryId as null
                setSelectedEntryId(entryIdCounter);
            }else{
                setSelectedEntryId(currentEntryNumber);
            }
        }

        // Logic to add a new entry
        if (nextEntryAdd && !currentEntryNumber){
            const currentEntryIdCounter = entryIdCounter;
            const newEntryNumbers = [...entryNumbers];

            setCurrentEntryNumber(currentEntryIdCounter);
            newEntryNumbers.push(currentEntryIdCounter);
            setEntryIdCounter(currentEntryIdCounter + 1);
            setEntryNumbers(newEntryNumbers);
        }

        // Identifies is this is not an empty timeline node
        if (nextEntryAdd){
            setIsSelected(nextEntrySelect);
        }

        // Choosing which entry-to-connect logic
        if (currentView === "connect-mode"){
            if (nextEntrySelect){
                if (connectState.first){
                    setConnectState({first: connectState.first, second: currentEntryNumber});
                }else{
                    // No need to verify if connectState.first === gridKey,
                    // because the .second will only set when a new entry is selected.
                    setConnectState({first: currentEntryNumber, second: null});
                }
            }else{
                // remove node if the node is deselected
                if (connectState.first === currentEntryNumber){
                    setConnectState({first: connectState.second, second: null});
                }
                if (connectState.second === currentEntryNumber){
                    setConnectState({first: currentEntryNumber, second: null});
                }
            }
        }
    };

    const [connectItems, setConnectItems] = useState([]);
    useEffect(() => {
        const newConnectItems = [];

        if (!!currentEntryNumber && connectSpecificEntries.has(currentEntryNumber)){
            for (const otherEntry of connectSpecificEntries.get(currentEntryNumber)){
                newConnectItems.push(<Xarrow key={`${currentEntryNumber}-to-${otherEntry}`}
                                             start={`entryNumber-${currentEntryNumber}`}
                                             end={`entryNumber-${otherEntry}`}
                                             showHead={false}
                                             startAnchor={"middle"}
                                             endAnchor={"middle"}
                                             zIndex={-100}
                                             color={"lightblue"}
                                             // animateDrawing={true}
                />)
            }
        }

        setConnectItems(newConnectItems);
    }, [connectSpecificEntries]);


    return (
        <div ref={gridRef} className="grid-item">
            {connectItems}
            <TimelineEntry onEntryClick={onEntryClick(entrySelect, currentEntryNumber)}
                           entrySelectState={entrySelect}
                           currentEntryNumber={currentEntryNumber}
                           setCurrentEntryNumber={setCurrentEntryNumber}
                           isHovering={isHovering}
                           currentView={currentView}/>

        </div>
    );
}


// Proptypes setup
GridItem.propTypes = {
    selectGridItemKey: PropTypes.number,
    setSelectGridItemKey: PropTypes.func.isRequired,
    gridKey: PropTypes.number.isRequired,
};

export default GridItem