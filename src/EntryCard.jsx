import {EntryCardContext} from "./Application.jsx";
import {useContext} from "react";

function EntryCard(){

    const {idValue} = useContext(EntryCardContext);
    const containerClasses = "card-container";


    return (
        <>
            <div id={idValue} className={containerClasses}>
                <div>Image</div>
                <div>Title</div>
                <div>Date</div>
                <div>Description</div>
            </div>
        </>
    );
}

// Exports
export default EntryCard