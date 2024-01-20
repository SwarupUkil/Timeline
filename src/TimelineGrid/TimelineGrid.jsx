import PropTypes from "prop-types";
import GridItem from "./GridItem.jsx";
import {useTransformEffect} from "react-zoom-pan-pinch";

function TimelineGrid({size, selectGridItemKey, setSelectGridItemKey, setPosition}){

    // Updates current x and y position while panning or zooming.
    useTransformEffect(({ state}) => {
        setPosition({x: state.positionX, y: state.positionY, scale: state.scale});
        return () => {}; // unmount
    });

    // Create an array of `GridItem` components
    const gridItems = [];
    for (let i = 1; i <= size; i++) {
        // Key added for React list rendering
        gridItems.push(<GridItem key={i}
                                 selectGridItemKey={selectGridItemKey}
                                 setSelectGridItemKey={setSelectGridItemKey}
                                 gridKey={i} />);
    }

    return (
        <>
            <div id={"timeline-grid-id"} className="timeline-grid">
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
    setPosition: PropTypes.func,
};

TimelineGrid.defaultProps = {
    size: 25,
};

// Exports
export default TimelineGrid