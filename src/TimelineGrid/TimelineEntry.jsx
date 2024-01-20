import PropTypes from "prop-types";
import {useContext} from "react";
import {EntryCardContext} from "../Application/Application.jsx";
import {useDrag} from "react-dnd";
import defaultImage from '../assets/timeline-entry-default.png';

// The actual Timeline Entry, which is a Draggable Component
const TimelineEntry = ({onEntryClick, entrySelectState, currentEntryNumber, setCurrentEntryNumber, isHovering, currentView}) => {

    const {setDisableDrag, entryIcons} = useContext(EntryCardContext); // This is to disable the timeline grid panning
    const [, entryDragRef] = useDrag(() => ({
        type: "entry",
        item: {entryId: currentEntryNumber, formerGridEntryNumberSetter: setCurrentEntryNumber},
        canDrag: () => {return (currentEntryNumber && currentView === "edit-mode")},
        collect: () => ({entryId: currentEntryNumber})
    }), [currentEntryNumber, currentView]);


    // This handles the styling class logic
    const entryClass = (entrySelectState ? "select" : "deselect") +
        " " + (currentEntryNumber ? "timeline-entry" : "") +
        " " + ((currentView === "view-mode" && !currentEntryNumber)  ? "hidden" : "") +
        " " + (isHovering ? "entry-hovering" : "");
    const imageClass = "icon";
    const hideClass = (currentEntryNumber ? "" : "hidden");

    // Determines if an entry uses the default icon if there lacks a given image.
    const givenImage = (currentEntryNumber && entryIcons.has(currentEntryNumber)) ? entryIcons.get(currentEntryNumber) : defaultImage;

    return(
        <>
            <div id={currentEntryNumber ? `entryNumber-${currentEntryNumber}` : undefined}
                 ref={entryDragRef}
                 onClick={onEntryClick}
                 onMouseEnter={() => setDisableDrag(true)}
                 onMouseLeave={() => setDisableDrag(false)}
                 className={"timeline-plot" + " " + entryClass }>
                    <img src={givenImage} alt={"entry-icon"} className={hideClass + " " + imageClass} />
            </div>
        </>
    );
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