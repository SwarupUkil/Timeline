import PropTypes from "prop-types";
import GridItem from "./GridItem.jsx";

function TimelineGrid({size, selectGridItemKey, setSelectGridItemKey, connectEntries}){

    const findConnection = (index) => {
        const connectClasses = [false, false, false, false];
        for (const [key, value] of connectEntries.entries()){
            if (key === index){
                connectClasses[0] = value.left;
                connectClasses[1] = value.right;
                connectClasses[2] = value.up;
                connectClasses[3] = value.down;
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
        gridItems.push(<GridItem selectGridItemKey={selectGridItemKey}
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

// Exports
export default TimelineGrid