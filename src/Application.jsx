import './Application.css'
import './EntryCard.css'
import TimelineGrid from "./TimelineGrid.jsx";
import EntryCard from "./EntryCard.jsx";

function Application() {
    return (
        <>
            <TimelineGrid size={25}/>
            <EntryCard/>
        </>
    );
}

export default Application