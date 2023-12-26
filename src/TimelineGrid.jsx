import {useState} from "react";

function TimelinePlot(){

    // eslint-disable-next-line react/prop-types
    // const plotClass = props.plotState ? "select" : "unselect";
    // eslint-disable-next-line react/prop-types
    // const onPlotClick = props.onPlotClick;

    return(
        // eslint-disable-next-line react/prop-types
        // <div onClick={onPlotClick} className={"timeline-plot" + " " + plotClass}></div>
        <div className={"timeline-plot"}></div>
    );
}

function GridItem(){
    const [plotSelect, setPlotSelect] = useState(false);

    const onPlotClick = (plotSelected) => () => {
        const nextPlotSelect = !plotSelected;
        setPlotSelect(nextPlotSelect);
    };

    return (
        <div className="grid-item">
            <div className="horizontal-line"></div>
            <div className="vertical-line"></div>
            <TimelinePlot onPlotClick={onPlotClick(plotSelect)} plotState={plotSelect} />
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