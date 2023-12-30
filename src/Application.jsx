import './Application.css'
import './EntryCard.css'
import TimelineGrid from "./TimelineGrid.jsx";
import EntryCard from "./EntryCard.jsx";
import {useState, createContext} from "react";

export const EntryCardContext = createContext({
    idValue: "hidden",
    setIdValue: () => {},
    keyValue: null,
    setKeyValue: () => {},
});

function Application() {
    const size = 25;
    const [idValue, setIdValue] = useState("hidden");
    const [keyValue, setKeyValue] = useState(null);

    return (
        <>
            <EntryCardContext.Provider value={{idValue, setIdValue, keyValue, setKeyValue}}>
                <TimelineGrid size={size}/>
                <EntryCard size={size}/>
            </EntryCardContext.Provider>
        </>
    );
}

export default Application