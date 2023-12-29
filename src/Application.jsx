import './Application.css'
import './EntryCard.css'
import TimelineGrid from "./TimelineGrid.jsx";
import EntryCard from "./EntryCard.jsx";
import {useState, createContext} from "react";

const EntryCardContext = createContext({
    idValue: "hidden",
    setIdValue: () => {},
    // imageRef: "",
    // title: "Title",
    // date: NaN,
    // description: "le description",
});

function Application() {
    // Basically have one entrycard container which
    // toggles from existing to not existing (select or deselect) and
    // based on specific node click, update the state.
    // Use context API?
    const [idValue, setIdValue] = useState("hidden");

    return (
        <>
            <EntryCardContext.Provider value={{idValue, setIdValue}}>
                <TimelineGrid size={25}/>
                <EntryCard />
            </EntryCardContext.Provider>
        </>
    );
}

export default Application