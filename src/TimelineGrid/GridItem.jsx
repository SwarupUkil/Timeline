import {useContext, useEffect, useState} from "react";
import {EntryCardContext} from "../Application/Application.jsx";
import TimelineEntry from "./TimelineEntry.jsx";
import PropTypes from "prop-types";
import useDropLogic from "./useDropLogic.js";
import Xarrow, {Xwrapper} from "react-xarrows";

function GridItem({selectGridItemKey, setSelectGridItemKey, gridKey, connectClasses}){

    const [entrySelect, setEntrySelect] = useState(selectGridItemKey === gridKey);
    const {setIsSelected, deleteState, setDeleteState, currentView,
        connectState, setConnectState, connectSpecificEntries,
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
        // console.log("some");
        if (!!currentEntryNumber && connectSpecificEntries.has(currentEntryNumber)){
            console.log("some");
            const newConnectItems = [];
            for (const otherEntry of connectSpecificEntries.get(currentEntryNumber)){
                newConnectItems.push(<Xarrow start={`entryNumber-${currentEntryNumber}`} end={`entryNumber-${otherEntry}`}/>)
            }
            setConnectItems(newConnectItems);
        }
    }, [connectSpecificEntries]);


    return (
        <div ref={gridRef} className="grid-item">
            <div className={connectClasses.left}></div>
            <div className={connectClasses.right}></div>
            <div className={connectClasses.up}></div>
            <div className={connectClasses.down}></div>
            <Xwrapper>
                {connectItems}
                <TimelineEntry onEntryClick={onEntryClick(entrySelect, currentEntryNumber)}
                               entrySelectState={entrySelect}
                               currentEntryNumber={currentEntryNumber}
                               setCurrentEntryNumber={setCurrentEntryNumber}
                               isHovering={isHovering}/>
            </Xwrapper>
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