import {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {EntryCardContext} from "../Application/Application.jsx";

function TimelineEntry({onEntryClick, entrySelectState, entryAddState}){

    const entryClass = (entrySelectState ? "select" : "deselect") +
                        " " + (entryAddState ? "timeline-entry" : "");

    return(<div onClick={onEntryClick} className={"timeline-plot" + " " + entryClass}></div>);
}


function GridItem({selectGridItemKey, setSelectGridItemKey, gridKey, connectClasses}){

    const [entrySelect, setEntrySelect] = useState(selectGridItemKey === gridKey);
    const [entryAdd, setEntryAdd] = useState(false);
    const {setKeyValue, setIsSelected, deleteState, setDeleteState, currentView,
    connectState, setConnectState} = useContext(EntryCardContext);

    useEffect(() => {
        const resetSelectState = selectGridItemKey === gridKey;

        // deletes entry
        if (deleteState && resetSelectState){
            setEntrySelect(false);
            setEntryAdd(false);
            setDeleteState(false);
            setIsSelected(false);
        }else{
            setEntrySelect(resetSelectState);
        }
    }, [deleteState, selectGridItemKey]);

    const onEntryClick = (entrySelected, entryAdded) => () => {
        const nextEntryAdd = (currentView === "edit-mode") ? (entryAdded || !entrySelected) : entryAdded;
        const nextEntrySelect = (currentView === "edit-mode" || nextEntryAdd) ? !entrySelected : false;
        setEntrySelect(nextEntrySelect);
        setEntryAdd(nextEntryAdd);

        if (nextEntrySelect) {
            setSelectGridItemKey(gridKey);
            setKeyValue(gridKey - 1); // required so that it fits array index values
        }
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
        <div className="grid-item">
            {/*<div className="horizontal-line"></div>*/}
            {/*<div className="vertical-line"></div>*/}
            <div className={connectClasses.left}></div>
            <div className={connectClasses.right}></div>
            <div className={connectClasses.up}></div>
            <div className={connectClasses.down}></div>
            <TimelineEntry onEntryClick={onEntryClick(entrySelect, entryAdd)}
                           entrySelectState={entrySelect}
                           entryAddState={entryAdd}/>
        </div>
    );
}


function TimelineGrid({size, selectGridItemKey, setSelectGridItemKey, connectEntries}){

    const findConnection = (index) => {
        const connectClasses = [false, false, false, false];
        for (const [key, value] of connectEntries.entries()){
            // console.log(key);
            if (key === index || key === index){
                for (const className of value){
                    if (className === "left"){
                        connectClasses[0] = true;
                    }else if (className === "right"){
                        connectClasses[1] = true;
                    }else if (className === "up"){
                        connectClasses[2] = true;
                    }else{
                        connectClasses[3] = true;
                    }
                }
            }
        }

        return {left: (connectClasses[0] ? "left" : ""),
            right: (connectClasses[1] ? "right" : ""),
            up: (connectClasses[2] ? "up" : ""),
            down: (connectClasses[3] ? "down" : "")};
    };

    // Create an array of `GridItem` components
    const gridItems = [];
    for (let i = 1; i <= size; i++) {
        // Key added for React list rendering
        gridItems.push(<GridItem key={i}
                                 selectGridItemKey={selectGridItemKey}
                                 setSelectGridItemKey={setSelectGridItemKey}
                                 gridKey={i}
                                 connectClasses={findConnection(i)}/>);
    }

    return (
        <>
            <div className="timeline-grid">
                {gridItems}
            </div>
        </>
    );
}


// PropTypes setup
TimelineGrid.propTypes = {
    size: PropTypes.number.isRequired,
    selectGridItemKey: PropTypes.number,
    setSelectGridItemKey: PropTypes.func,
    connectEntries: PropTypes.any,
};

TimelineGrid.defaultProps = {
    size: 25,
};

GridItem.propTypes = {
    selectGridItemKey: PropTypes.number,
    setSelectGridItemKey: PropTypes.func.isRequired,
    gridKey: PropTypes.number.isRequired,
    connectClasses: PropTypes.string,
};

TimelineEntry.propTypes = {
    onEntryClick: PropTypes.func,
    entrySelectState: PropTypes.bool,
    entryAddState: PropTypes.bool,
};

// Exports
export default TimelineGrid