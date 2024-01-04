import {useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import {EntryCardContext} from "../Application/Application.jsx";

function TimelineEntry({onEntryClick, entrySelectState, entryAddState}){

    const entryClass = (entrySelectState ? "select" : "deselect") +
                        " " + (entryAddState ? "timeline-entry" : "");

    return(<div onClick={onEntryClick} className={"timeline-plot" + " " + entryClass}></div>);
}


function GridItem({selectGridItemKey, setSelectGridItemKey, gridKey}){

    const [entrySelect, setEntrySelect] = useState(selectGridItemKey === gridKey);
    const [entryAdd, setEntryAdd] = useState(false);
    const {setKeyValue, setIsSelected, deleteState, setDeleteState, currentView} = useContext(EntryCardContext);

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
    };

    return (
        <div className="grid-item">
            <div className="horizontal-line"></div>
            <div className="vertical-line"></div>
            <TimelineEntry onEntryClick={onEntryClick(entrySelect, entryAdd)}
                           entrySelectState={entrySelect}
                           entryAddState={entryAdd}/>
        </div>
    );
}


function TimelineGrid(props){

    // Create an array of `GridItem` components
    const gridItems = [];
    for (let i = 1; i <= props.size; i++) {
        // Key added for React list rendering
        gridItems.push(<GridItem key={i}
                                 selectGridItemKey={props.selectGridItemKey}
                                 setSelectGridItemKey={props.setSelectGridItemKey}
                                 gridKey={i} />);
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
};

TimelineGrid.defaultProps = {
    size: 25,
};

GridItem.propTypes = {
    selectGridItemKey: PropTypes.number,
    setSelectGridItemKey: PropTypes.func.isRequired,
    gridKey: PropTypes.number.isRequired,
};

TimelineEntry.propTypes = {
    onEntryClick: PropTypes.func,
    entrySelectState: PropTypes.bool,
    entryAddState: PropTypes.bool,
};

// Exports
export default TimelineGrid