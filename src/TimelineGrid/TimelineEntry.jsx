import PropTypes from "prop-types";
import {useContext} from "react";
import {EntryCardContext} from "../Application/Application.jsx";
import {useDrag} from "react-dnd";

// The actual Timeline Entry, which is a Draggable Component
const TimelineEntry = ({onEntryClick, entrySelectState, currentEntryNumber, setCurrentEntryNumber, isHovering, currentView}) => {

    const {setDisableDrag} = useContext(EntryCardContext); // This is to disable the timeline grid panning
    const [, entryDragRef] = useDrag(() => ({
        type: "entry",
        item: {entryId: currentEntryNumber, formerGridEntryNumberSetter: setCurrentEntryNumber},
        canDrag: () => {return (currentEntryNumber && currentView === "edit-mode")},
        collect: () => ({entryId: currentEntryNumber})
    }), [currentEntryNumber, currentView]);

    const entryClass = (entrySelectState ? "select" : "deselect") +
        " " + (currentEntryNumber ? "timeline-entry" : "") +
        " " + (isHovering ? "entry-hovering" : "");

    return(<div id={currentEntryNumber ? `entryNumber-${currentEntryNumber}` : undefined}
                ref={entryDragRef}
                onClick={onEntryClick} onMouseEnter={() => setDisableDrag(true)} onMouseLeave={() => setDisableDrag(false)}
                className={"timeline-plot" + " " + entryClass}></div>);
}

// Proptypes setup
TimelineEntry.propTypes = {
    onEntryClick: PropTypes.func,
    entrySelectState: PropTypes.bool,
    currentEntryNumber: PropTypes.number,
    setCurrentEntryNumber: PropTypes.func,
    isHovering: PropTypes.bool,
    currentView: PropTypes.string,
};

export default TimelineEntry