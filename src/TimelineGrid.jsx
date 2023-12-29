import {useEffect, useState} from "react";
// import PropTypes from "prop-types";

function TimelineEntry(props){

    // eslint-disable-next-line react/prop-types
    let classStr = props.entrySelectState ? "select" : "deselect";
    classStr += " ";
    // eslint-disable-next-line react/prop-types
    classStr += props.entryAddState ? "timeline-entry" : "";
    const entryClass = classStr;

    // eslint-disable-next-line react/prop-types
    const onEntryClick = props.onEntryClick;

    return(
        // eslint-disable-next-line react/prop-types
        <div onClick={onEntryClick} className={"timeline-plot" + " " + entryClass}></div>
    );
}

function GridItem(props){
    // eslint-disable-next-line react/prop-types
    const [entrySelect, setEntrySelect] = useState(props.selectGridItemKey === props.gridKey);
    const [entryAdd, setEntryAdd] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react/prop-types
        setEntrySelect(props.selectGridItemKey === props.gridKey)
        // eslint-disable-next-line react/prop-types
    }, [props.gridKey, props.selectGridItemKey]);

    const onEntryClick = (entrySelected, entryAdded) => () => {
        const nextEntrySelect = !entrySelected;
        const nextEntryAdd = entryAdded || nextEntrySelect;
        setEntrySelect(nextEntrySelect);
        setEntryAdd(nextEntryAdd);
        // eslint-disable-next-line react/prop-types
        props.setSelectGridItemKey(props.gridKey);
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
    // eslint-disable-next-line react/prop-types
    for (let i = 1; i <= props.size; i++) {
        gridItems.push(<GridItem key={i}
                                 selectGridItemKey={selectGridItemKey}
                                 setSelectGridItemKey={setSelectGridItemKey}
                                 gridKey={i} />);  // Key added for React list rendering
    }

    return (
        <>
            <div className="timeline-grid">
                {gridItems}
            </div>
        </>
    );
}

// TimelineGrid.propTypes = {
//     side: PropTypes.number.isRequired,
// };
//
// TimelineGrid.defaultProps = {
//     side: 25,
// };

export default TimelineGrid