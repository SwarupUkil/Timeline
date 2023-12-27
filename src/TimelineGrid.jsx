import {useState} from "react";

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

function GridItem(){
    const [entrySelect, setEntrySelect] = useState(false);
    const [entryAdd, setEntryAdd] = useState(false);

    const onEntryClick = (entrySelected, entryAdded) => () => {
        const nextEntrySelect = !entrySelected;
        const nextEntryAdd = entryAdded || nextEntrySelect;
        setEntrySelect(nextEntrySelect);
        setEntryAdd(nextEntryAdd);
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
    // eslint-disable-next-line react/prop-types
    for (let i = 0; i < props.size; i++) {
        gridItems.push(<GridItem key={i} />);  // Key added for React list rendering
    }

    return (
        <>
            <div className="timeline-grid">
                {gridItems}
            </div>
        </>
    );
}

export default TimelineGrid