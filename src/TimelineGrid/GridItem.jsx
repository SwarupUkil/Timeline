import {useContext, useEffect, useState} from "react";
import {EntryCardContext} from "../Application/Application.jsx";
import TimelineEntry from "./TimelineEntry.jsx";
import PropTypes from "prop-types";
import useDropLogic from "./useDropLogic.js";

function GridItem({selectGridItemKey, setSelectGridItemKey, gridKey, connectClasses}){

    const [entrySelect, setEntrySelect] = useState(selectGridItemKey === gridKey);
    const {setIsSelected, deleteState, setDeleteState, currentView,
        connectState, setConnectState,
        entryIdCounter, setEntryIdCounter, entryNumbers, setEntryNumbers, setSelectedEntryId} = useContext(EntryCardContext);

    const {currentEntryNumber, setCurrentEntryNumber, isHovering, gridRef}
        = useDropLogic(setSelectedEntryId, gridKey, setSelectGridItemKey);


    useEffect(() => {
        const resetSelectState = selectGridItemKey === gridKey;

        // deletes entry
        if (deleteState && resetSelectState){
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
            setEntryIdCounter(currentEntryIdCounter + 1);
            newEntryNumbers.push(currentEntryIdCounter);
            setEntryNumbers(newEntryNumbers);
        }

        // Identifies is this is not an empty timeline node
        if (nextEntryAdd){
            setIsSelected(nextEntrySelect);
        }

        // Choosing which grids to connect logic
        if (currentView === "connect-mode"){
            if (nextEntrySelect){
                if (connectState.first){
                    setConnectState({first: connectState.first, second: gridKey});
                }else{
                    // No need to verify if connectState.first === gridKey,
                    // because the .second will only set when a new entry is selected.
                    setConnectState({first: gridKey, second: null});
                }
            }else{
                // remove node if the node is deselected
                if (connectState.first === gridKey){
                    setConnectState({first: connectState.second, second: null});
                }
                if (connectState.second === gridKey){
                    setConnectState({first: gridKey, second: null});
                }
            }
        }
    };

    return (
        <div ref={gridRef} className="grid-item">
            <div className={connectClasses.left}></div>
            <div className={connectClasses.right}></div>
            <div className={connectClasses.up}></div>
            <div className={connectClasses.down}></div>
            <TimelineEntry onEntryClick={onEntryClick(entrySelect, currentEntryNumber)}
                           entrySelectState={entrySelect}
                           currentEntryNumber={currentEntryNumber}
                           setCurrentEntryNumber={setCurrentEntryNumber}
                           isHovering={isHovering}/>
        </div>
    );
}


// Proptypes setup
GridItem.propTypes = {
    selectGridItemKey: PropTypes.number,
    setSelectGridItemKey: PropTypes.func.isRequired,
    gridKey: PropTypes.number.isRequired,
    connectClasses: PropTypes.object,
};

export default GridItem