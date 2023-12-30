import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useContext} from "react";
import {EntryCardContext} from "./Application.jsx";

function TimelineEntry(props){

    let classStr = props.entrySelectState ? "select" : "deselect";
    classStr += " ";
    classStr += props.entryAddState ? "timeline-entry" : "";

    const entryClass = classStr;
    const onEntryClick = props.onEntryClick;

    return(
        <div onClick={onEntryClick} className={"timeline-plot" + " " + entryClass}></div>
    );
}


function GridItem(props){

    const [entrySelect, setEntrySelect] = useState(props.selectGridItemKey === props.gridKey);
    const [entryAdd, setEntryAdd] = useState(false);
    const {setIdValue, setKeyValue} = useContext(EntryCardContext);

    useEffect(() => {
        setEntrySelect(props.selectGridItemKey === props.gridKey)
    }, [props.gridKey, props.selectGridItemKey]);

    const onEntryClick = (entrySelected, entryAdded) => () => {
        const nextEntrySelect = !entrySelected;
        const nextEntryAdd = entryAdded || nextEntrySelect;

        setEntrySelect(nextEntrySelect);
        setEntryAdd(nextEntryAdd);
        props.setSelectGridItemKey(props.gridKey);
        setKeyValue(props.gridKey - 1); // required so that it fits array index values

        // if selected node is toggled to be selected
        // then show the EntryCard with appropriate info.
        if (nextEntrySelect){
            setIdValue("show");
        }else{
            setIdValue("hidden");
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

    const [selectGridItemKey, setSelectGridItemKey] = useState(null);

    // Create an array of `GridItem` components
    const gridItems = [];
    for (let i = 1; i <= props.size; i++) {
        // Key added for React list rendering
        gridItems.push(<GridItem key={i}
                                 selectGridItemKey={selectGridItemKey}
                                 setSelectGridItemKey={setSelectGridItemKey}
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